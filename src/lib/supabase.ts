import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export function getSupabaseClient() {
    if (!isSupabaseConfigured) {
        return null;
    }
    return createClient(supabaseUrl, supabaseAnonKey);
}

export function getSupabaseAdminClient() {
    const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || supabaseAnonKey;
    if (!supabaseUrl || !serviceRoleKey) {
        return null;
    }
    return createClient(supabaseUrl, serviceRoleKey);
}
