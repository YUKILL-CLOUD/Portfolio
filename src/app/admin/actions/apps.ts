'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { appSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function saveAppAction(formData: Record<string, any>) {
    const validated = appSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('apps').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'App badge saved successfully!' };
}

export async function deleteAppAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('apps').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'App badge deleted successfully!' };
}
