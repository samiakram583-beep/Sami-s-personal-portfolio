import { supabase } from '../lib/supabase';

export interface ContactMessage {
  id: string;
  name: string;
  email: string;
  phone?: string | null;
  subject?: string | null;
  budget?: string | null;
  timeline?: string | null;
  message: string;
  created_at: string;
  is_read: boolean;
}

export interface NewContactMessagePayload {
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  budget?: string;
  timeline?: string;
  message: string;
}

export interface DashboardStats {
  total: number;
  unread: number;
  thisMonth: number;
}

/**
 * Normalizes any Supabase record (from appointments or contact_messages table)
 * into a standard ContactMessage.
 */
export function mapRecordToMessage(row: any): ContactMessage {
  const isRead =
    typeof row.is_read === 'boolean'
      ? row.is_read
      : row.status === 'read' || row.status === 'completed';

  return {
    id: String(row.id),
    name: row.name || 'Anonymous Client',
    email: row.email || '',
    phone: row.phone || null,
    subject: row.subject || row.service || 'Project Inquiry',
    budget: row.budget || null,
    timeline: row.timeline || null,
    message: row.message || '',
    created_at: row.created_at || new Date().toISOString(),
    is_read: isRead,
  };
}

/**
 * Submits a new contact message to Supabase.
 * Tries the primary 'appointments' table where user messages are stored,
 * and also syncs to 'contact_messages' if present.
 */
export async function submitContactMessage(
  payload: NewContactMessagePayload
): Promise<{ success: boolean; error?: string; isTableMissing?: boolean }> {
  try {
    const appointmentRecord = {
      name: payload.name.trim(),
      email: payload.email.trim(),
      phone: payload.phone?.trim() || null,
      service: payload.subject?.trim() || 'General Inquiry',
      budget: payload.budget || null,
      timeline: payload.timeline || null,
      message: payload.message.trim(),
      status: 'pending',
      created_at: new Date().toISOString(),
    };

    // Primary insert into existing appointments table
    const apptRes = await supabase.from('appointments').insert([appointmentRecord]);
    if (!apptRes.error) {
      return { success: true };
    }

    // Secondary fallback to contact_messages if table exists
    const contactRecord = {
      ...appointmentRecord,
      subject: payload.subject?.trim() || 'General Inquiry',
      is_read: false,
    };
    const contactRes = await supabase.from('contact_messages').insert([contactRecord]);
    if (!contactRes.error) {
      return { success: true };
    }

    const isMissing =
      apptRes.error.message?.includes('Could not find the table') ||
      apptRes.error.code === 'PGRST205' ||
      apptRes.error.code === '42P01';

    return {
      success: false,
      error: apptRes.error.message,
      isTableMissing: isMissing,
    };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to submit message to database.',
    };
  }
}

/**
 * Fetches all contact messages from Supabase.
 * Checks the existing 'appointments' table (which stores incoming inquiries)
 * as well as 'contact_messages', consolidating results.
 */
export async function fetchContactMessages(): Promise<{
  messages: ContactMessage[];
  error?: string;
  isTableMissing?: boolean;
}> {
  try {
    const candidateTables = ['appointments', 'contact_messages'];
    const allMessages: ContactMessage[] = [];
    let foundAnyTable = false;
    let tableMissingError = false;

    for (const table of candidateTables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .order('created_at', { ascending: false });

      if (!error && Array.isArray(data)) {
        foundAnyTable = true;
        for (const row of data) {
          allMessages.push(mapRecordToMessage(row));
        }
      } else if (error) {
        if (
          error.message?.includes('Could not find the table') ||
          error.message?.includes('schema cache') ||
          error.code === 'PGRST205' ||
          error.code === 'PGRST204' ||
          error.code === '42P01'
        ) {
          tableMissingError = true;
        }
      }
    }

    if (!foundAnyTable && tableMissingError) {
      return {
        messages: [],
        isTableMissing: true,
        error: "Table not found in Supabase database.",
      };
    }

    // Deduplicate by ID
    const uniqueMap = new Map<string, ContactMessage>();
    for (const msg of allMessages) {
      if (!uniqueMap.has(msg.id)) {
        uniqueMap.set(msg.id, msg);
      }
    }

    // Sort newest first
    const sorted = Array.from(uniqueMap.values()).sort(
      (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );

    return { messages: sorted, isTableMissing: false };
  } catch (err: any) {
    return {
      messages: [],
      error: err?.message || 'Failed to load messages from database.',
    };
  }
}

/**
 * Fetches a single message by ID from whichever table contains it.
 */
export async function fetchContactMessageById(
  id: string
): Promise<{ message: ContactMessage | null; error?: string }> {
  try {
    const candidateTables = ['appointments', 'contact_messages'];

    for (const table of candidateTables) {
      const { data, error } = await supabase
        .from(table)
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (!error && data) {
        return { message: mapRecordToMessage(data) };
      }
    }

    return { message: null, error: 'Message not found in database.' };
  } catch (err: any) {
    return {
      message: null,
      error: err?.message || 'Failed to load message.',
    };
  }
}

/**
 * Updates read status of a message across candidate tables.
 */
export async function updateMessageReadStatus(
  id: string,
  is_read: boolean
): Promise<{ success: boolean; error?: string }> {
  try {
    // 1. Update in appointments table
    const apptUpdate = await supabase
      .from('appointments')
      .update({ status: is_read ? 'read' : 'pending' })
      .eq('id', id);

    // 2. Also attempt update in contact_messages if applicable
    await supabase
      .from('contact_messages')
      .update({ is_read })
      .eq('id', id);

    if (apptUpdate.error && !apptUpdate.error.message?.includes('PGRST205')) {
      return { success: false, error: apptUpdate.error.message };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to update read status.',
    };
  }
}

/**
 * Deletes a message by ID across candidate tables.
 */
export async function deleteContactMessage(
  id: string
): Promise<{ success: boolean; error?: string }> {
  try {
    // Attempt delete in appointments
    const apptDelete = await supabase
      .from('appointments')
      .delete()
      .eq('id', id);

    // Attempt delete in contact_messages
    await supabase
      .from('contact_messages')
      .delete()
      .eq('id', id);

    if (apptDelete.error && !apptDelete.error.message?.includes('PGRST205')) {
      return { success: false, error: apptDelete.error.message };
    }

    return { success: true };
  } catch (err: any) {
    return {
      success: false,
      error: err?.message || 'Failed to delete message.',
    };
  }
}

/**
 * Computes dashboard statistics from actual Supabase messages.
 */
export async function fetchDashboardStats(): Promise<{
  stats: DashboardStats;
  error?: string;
}> {
  try {
    const { messages, error } = await fetchContactMessages();
    if (error && messages.length === 0) {
      return {
        stats: { total: 0, unread: 0, thisMonth: 0 },
        error,
      };
    }

    const now = new Date();
    const currentYear = now.getFullYear();
    const currentMonth = now.getMonth();

    const total = messages.length;
    const unread = messages.filter((m) => !m.is_read).length;
    const thisMonth = messages.filter((m) => {
      const d = new Date(m.created_at);
      return d.getFullYear() === currentYear && d.getMonth() === currentMonth;
    }).length;

    return {
      stats: { total, unread, thisMonth },
    };
  } catch (err: any) {
    return {
      stats: { total: 0, unread: 0, thisMonth: 0 },
      error: err?.message,
    };
  }
}
