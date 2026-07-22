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
        const { data: existingSettings } = await supabase.from('settings').select('id').limit(1).single();

        const payload: any = {
            ...validated.data,
            updated_at: new Date().toISOString()
        };

        if (existingSettings?.id) {
            payload.id = existingSettings.id;
        }

        const { error } = await supabase.from('settings').upsert(payload);
        if (error) return { success: false, message: error.message };
    }

    revalidatePath('/');
    return { success: true, message: 'Site settings updated successfully!' };
}
