'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { serviceSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function saveServiceAction(formData: Record<string, any>) {
    const validated = serviceSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('services').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Service saved successfully!' };
}

export async function deleteServiceAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('services').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Service deleted successfully!' };
}
