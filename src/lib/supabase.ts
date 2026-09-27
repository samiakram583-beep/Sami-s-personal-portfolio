import { createClient } from '@supabase/supabase-js';

export const SUPABASE_PROJECT_ID = 'gjdwleugyubxmwmzfojq';
export const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL || `https://${SUPABASE_PROJECT_ID}.supabase.co`;
export const SUPABASE_ANON_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || 'sb_publishable_jGavYi70Ivw4_a9GGwyG5A_RQyHOymz';

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
