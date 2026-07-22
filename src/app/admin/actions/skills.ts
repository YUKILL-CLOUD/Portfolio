'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { skillSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function saveSkillAction(formData: Record<string, any>) {
    const validated = skillSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('skills').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Skill saved successfully!' };
}

export async function deleteSkillAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('skills').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Skill deleted successfully!' };
}
