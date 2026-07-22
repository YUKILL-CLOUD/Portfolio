'use server';

import { getSupabaseAdminClient } from '@/lib/supabase';
import { projectSchema } from '@/lib/validations';
import { revalidatePath } from 'next/cache';
import fs from 'fs/promises';
import path from 'path';

export async function saveProjectAction(formData: Record<string, any>) {
    const validated = projectSchema.safeParse(formData);
    if (!validated.success) {
        return { success: false, errors: validated.error.flatten().fieldErrors };
    }

    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const payload = {
            ...validated.data,
            updated_at: new Date().toISOString()
        };
        const { error } = await supabase.from('projects').upsert(payload);
        if (error) {
            return { success: false, message: error.message };
        }
    } else {
        // Fallback update to portfolio.json
        const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const existingIndex = content.projects.findIndex((p: any) => p.id === validated.data.id);
        const projectData = {
            id: validated.data.id || String(Date.now()),
            title: validated.data.title,
            category: validated.data.category,
            image: validated.data.image || '/zbudget.png',
            gallery: validated.data.gallery,
            link: validated.data.link,
            github_url: validated.data.github_url,
            description: validated.data.description,
            longDescription: validated.data.long_description,
            technologies: validated.data.technologies
        };

        if (existingIndex >= 0) {
            content.projects[existingIndex] = projectData;
        } else {
            content.projects.push(projectData);
        }
        await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    }

    revalidatePath('/');
    return { success: true, message: 'Project saved successfully!' };
}

export async function deleteProjectAction(id: string) {
    const supabase = getSupabaseAdminClient();
    if (supabase) {
        const { error } = await supabase.from('projects').delete().eq('id', id);
        if (error) return { success: false, message: error.message };
    } else {
        const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        content.projects = content.projects.filter((p: any) => p.id !== id);
        await fs.writeFile(filePath, JSON.stringify(content, null, 2));
    }

    revalidatePath('/');
    return { success: true, message: 'Project deleted successfully!' };
}
