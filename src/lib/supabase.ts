import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = 'gjdwleugyubxmwmzfojq';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jGavYi70Ivw4_a9GGwyG5A_RQyHOymz';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

export interface AppointmentBookingPayload {
  name: string;
  email: string;
  phone?: string;
  service: string;
  barber_name?: string;
  appointment_date?: string;
  appointment_time?: string;
  budget?: string;
  timeline?: string;
  message?: string;
  status?: string;
}

export interface BookingSubmissionResult {
  success: boolean;
  table: string;
  recordId?: string;
  error?: string;
  isTableMissing?: boolean;
}

export const APPOINTMENTS_SQL_SCHEMA = `-- Run this in your Supabase SQL Editor (https://supabase.com/dashboard/project/${SUPABASE_PROJECT_ID}/sql)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT now(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    service TEXT NOT NULL,
    barber_name TEXT,
    appointment_date DATE,
    appointment_time TEXT,
    budget TEXT,
    timeline TEXT,
    message TEXT,
    status TEXT DEFAULT 'pending'
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

-- Allow anonymous inserts from web clients using your publishable/anon key
CREATE POLICY "Allow public insert" ON public.appointments
    FOR INSERT WITH CHECK (true);

-- Allow public select for reading appointments
CREATE POLICY "Allow public select" ON public.appointments
    FOR SELECT USING (true);`;

/**
 * Saves appointment booking details to Supabase.
 * Tries the primary 'appointments' table, and gracefully falls back to 'bookings' or local storage queue if table is pending creation.
 */
export async function saveAppointmentBooking(payload: AppointmentBookingPayload): Promise<BookingSubmissionResult> {
  const candidateTables = ['appointments', 'bookings', 'inquiries'];
  let lastErrorMsg = '';
  let tableMissing = false;

  const dataToInsert = {
    name: payload.name.trim(),
    email: payload.email.trim(),
    phone: payload.phone?.trim() || null,
    service: payload.service || 'General Appointment',
    barber_name: payload.barber_name?.trim() || null,
    appointment_date: payload.appointment_date || new Date().toISOString().split('T')[0],
    appointment_time: payload.appointment_time || null,
    budget: payload.budget || null,
    timeline: payload.timeline || null,
    message: payload.message?.trim() || null,
    status: payload.status || 'pending',
    created_at: new Date().toISOString(),
  };

  for (const table of candidateTables) {
    try {
      const { data, error } = await supabase
        .from(table)
        .insert([dataToInsert])
        .select();

      if (!error) {
        // Successfully saved in Supabase!
        const recordId = data && data[0]?.id ? String(data[0].id) : undefined;
        return {
          success: true,
          table,
          recordId,
        };
      }

      lastErrorMsg = error.message;

      // Check if error is because table does not exist yet in Supabase
      if (
        error.message?.includes('Could not find the table') ||
        error.message?.includes('schema cache') ||
        error.message?.includes('relation') ||
        error.code === '42P01' ||
        error.code === 'PGRST204' ||
        error.code === 'PGRST205'
      ) {
        tableMissing = true;
        // Try next candidate table
        continue;
      }

      // If RLS policy error, try simplified insert without returning representation
      if (error.message.includes('row-level security') || error.code === '42501') {
        const simpleInsert = await supabase.from(table).insert([dataToInsert]);
        if (!simpleInsert.error) {
          return { success: true, table };
        }
      }
    } catch (err: any) {
      lastErrorMsg = err?.message || 'Network error';
    }
  }

  // Backup to localStorage so booking is never lost
  try {
    const existing = JSON.parse(localStorage.getItem('saved_appointments_queue') || '[]');
    existing.push({ ...dataToInsert, queuedAt: new Date().toISOString() });
    localStorage.setItem('saved_appointments_queue', JSON.stringify(existing));
  } catch (e) {
    // Ignore localStorage error in strict environments
  }

  return {
    success: false,
    table: 'appointments',
    error: lastErrorMsg,
    isTableMissing: tableMissing,
  };
}
