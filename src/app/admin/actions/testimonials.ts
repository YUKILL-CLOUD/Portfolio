'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { testimonialSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function saveTestimonialAction(formData: Record<string, any>) {
    const validated = testimonialSchema.safeParse(formData);
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
        const { error } = await supabase.from('testimonials').upsert(payload);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Testimonial saved successfully!' };
}

export async function deleteTestimonialAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('testimonials').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Testimonial deleted successfully!' };
}
