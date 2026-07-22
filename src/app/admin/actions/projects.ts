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
        // If this project is set to featured, unset featured on all other projects first
        if (validated.data.featured) {
            await supabase.from('projects').update({ featured: false }).neq('id', validated.data.id || '00000000-0000-0000-0000-000000000000');
        }

        const payload: any = {
            ...validated.data,
            updated_at: new Date().toISOString()
        };

        if (!payload.id || payload.id.trim() === '') {
            delete payload.id;
        }

        const { error } = await supabase.from('projects').upsert(payload);
        if (error) {
            return { success: false, message: error.message };
        }
    } else {
        // Fallback update to portfolio.json
        const filePath = path.join(process.cwd(), 'src/data/portfolio.json');
        const content = JSON.parse(await fs.readFile(filePath, 'utf-8'));
        const existingIndex = content.projects.findIndex((p: any) => p.id === validated.data.id);

        if (validated.data.featured) {
            content.projects.forEach((p: any) => { p.featured = false; });
        }

        const projectData = {
            id: validated.data.id || String(Date.now()),
            title: validated.data.title,
            slug: validated.data.slug,
            category: validated.data.category,
            image: validated.data.image || '/zbudget.png',
            gallery: validated.data.gallery,
            link: validated.data.link,
            github_url: validated.data.github_url,
            description: validated.data.description,
            longDescription: validated.data.long_description,
            key_highlights: validated.data.key_highlights,
            technologies: validated.data.technologies,
            featured: validated.data.featured
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
