'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { experienceSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function saveExperienceAction(formData: Record<string, any>) {
    const validated = experienceSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('experience').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Experience saved successfully!' };
}

export async function deleteExperienceAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('experience').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Experience deleted successfully!' };
}
