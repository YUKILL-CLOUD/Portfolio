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
        const { error } = await supabase.from('hero').upsert({
            ...validated.data,
            updated_at: new Date().toISOString()
        });
        if (error) {
            return { success: false, message: error.message };
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
