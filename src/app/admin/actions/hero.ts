'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { heroSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function updateHeroAction(formData: Record<string, any>) {
    const validated = heroSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        // Fetch existing hero record if any to obtain ID
        const { data: existingHero } = await supabase.from('hero').select('id').limit(1).single();

        const heroPayload: any = {
            name: validated.data.name,
            role: validated.data.role,
            location: validated.data.location,
            bio: validated.data.bio,
            avatar: validated.data.avatar,
            years_exp: validated.data.years_exp,
            projects_completed: validated.data.projects_completed,
            clients_count: validated.data.clients_count,
            automation_years: validated.data.automation_years,
            resume_url: validated.data.resume_url,
            status: validated.data.status,
            updated_at: new Date().toISOString()
        };

        if (existingHero?.id) {
            heroPayload.id = existingHero.id;
        }

        const { error } = await supabase.from('hero').upsert(heroPayload);
        if (error) {
            return { success: false, message: error.message };
        }

        // Also update automation_samples_url in settings if present
        if (validated.data.automation_samples_url !== undefined) {
            const { data: existingSettings } = await supabase.from('settings').select('id').limit(1).single();
            const settingsPayload: any = {
                automation_samples_url: validated.data.automation_samples_url,
                updated_at: new Date().toISOString()
            };
            if (existingSettings?.id) {
                settingsPayload.id = existingSettings.id;
            }
            await supabase.from('settings').upsert(settingsPayload);
        }
    } else {
        // Local JSON update fallback
        const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        content.profile = {
            ...content.profile,
            name: validated.data.name,
            role: validated.data.role,
            location: validated.data.location,
            bio: validated.data.bio,
            avatar: validated.data.avatar
        };
        await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    }

    revalidatePath('/');
    return { success: true, message: 'Hero section updated successfully!' };
}
