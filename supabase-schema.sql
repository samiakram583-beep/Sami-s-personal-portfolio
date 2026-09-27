-- ==============================================================================
-- Supabase Schema for Sami-Ullah-Akram Portfolio & Private Admin Panel
-- Project ID: gjdwleugyubxmwmzfojq
-- Run this in your Supabase SQL Editor: 
-- https://supabase.com/dashboard/project/gjdwleugyubxmwmzfojq/sql
-- ==============================================================================

-- 1. CONTACT MESSAGES TABLE (For public portfolio contact form & private Admin Inbox)
CREATE TABLE IF NOT EXISTS public.contact_messages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT,
    subject TEXT,
    budget TEXT,
    timeline TEXT,
    message TEXT NOT NULL,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    is_read BOOLEAN DEFAULT FALSE
);

-- Indexes for efficient ordering and unread filtering
CREATE INDEX IF NOT EXISTS idx_contact_messages_created_at ON public.contact_messages (created_at DESC);
CREATE INDEX IF NOT EXISTS idx_contact_messages_is_read ON public.contact_messages (is_read);

-- Enable Row Level Security (RLS)
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if re-running
DROP POLICY IF EXISTS "Allow public insert" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated read" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated update" ON public.contact_messages;
DROP POLICY IF EXISTS "Allow authenticated delete" ON public.contact_messages;

-- RLS Policy 1: Public visitors can INSERT messages through the contact form
CREATE POLICY "Allow public insert" ON public.contact_messages
    FOR INSERT WITH CHECK (true);

-- RLS Policy 2: ONLY authenticated admin users can SELECT/read messages
CREATE POLICY "Allow authenticated read" ON public.contact_messages
    FOR SELECT TO authenticated USING (true);

-- RLS Policy 3: ONLY authenticated admin users can UPDATE (mark as read/unread)
CREATE POLICY "Allow authenticated update" ON public.contact_messages
    FOR UPDATE TO authenticated USING (true) WITH CHECK (true);

-- RLS Policy 4: ONLY authenticated admin users can DELETE messages
CREATE POLICY "Allow authenticated delete" ON public.contact_messages
    FOR DELETE TO authenticated USING (true);


-- 2. APPOINTMENTS TABLE (For U.S. Barber appointment scheduling platform)
CREATE TABLE IF NOT EXISTS public.appointments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
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

ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Allow public insert appointments" ON public.appointments;
DROP POLICY IF EXISTS "Allow public select appointments" ON public.appointments;

CREATE POLICY "Allow public insert appointments" ON public.appointments
    FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow public select appointments" ON public.appointments
    FOR SELECT USING (true);
