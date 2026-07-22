'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { contactSchema, socialLinkSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function updateContactAction(formData: Record<string, any>) {
    const validated = contactSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('contact').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Contact information updated successfully!' };
}

export async function saveSocialLinkAction(formData: Record<string, any>) {
    const validated = socialLinkSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const payload: any = {
            ...validated.data,
            updated_at: new Date().toISOString()
        };
        if (!payload.id || payload.id.trim() === '') {
            delete payload.id;
        }
        const { error } = await supabase.from('social_links').upsert(payload);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Social link saved successfully!' };
}

export async function deleteSocialLinkAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('social_links').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Social link deleted successfully!' };
}
