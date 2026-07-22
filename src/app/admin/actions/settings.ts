'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { settingsSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';

export async function updateSettingsAction(formData: Record<string, any>) {
    const validated = settingsSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('settings').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Site settings updated successfully!' };
}
