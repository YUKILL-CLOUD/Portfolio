import { getSupabaseClient, isSupabaseConfigured } from './supabase';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

async function getLocalFallbackData() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        return JSON.parse(fileContent);
    } catch {
        return {};
    }
}

export async function getHero() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase.from('hero').select('*').eq('status', 'published').limit(1).single();
            if (data) return data;
        }
    }
    const local = await getLocalFallbackData();
    return {
        name: local.profile?.name || 'Paul Bernard Bartolo',
        role: local.profile?.role || 'Full Stack Developer, Kajabi & GHL Expert',
        location: local.profile?.location || 'Philippines',
        bio: local.profile?.bio || '',
        avatar: local.profile?.avatar || '/pp.png',
        years_exp: local.stats?.[0]?.value || '7+',
        projects_completed: local.stats?.[1]?.value || '50+',
        clients_count: local.stats?.[2]?.value || '30+'
    };
}

export async function getProjects() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('projects')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) {
                return data.map(p => ({
                    id: p.id,
                    title: p.title,
                    category: p.category,
                    image: p.image,
                    gallery: p.gallery || [],
                    link: p.link,
                    github_url: p.github_url,
                    description: p.description,
                    longDescription: p.long_description,
                    technologies: p.technologies || [],
                    featured: p.featured,
                    display_order: p.display_order
                }));
            }
        }
    }
    const local = await getLocalFallbackData();
    return local.projects || [];
}

export async function getServices() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('services')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) return data;
        }
    }
    const local = await getLocalFallbackData();
    return local.services || [];
}

export async function getSkills() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('skills')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) return data;
        }
    }
    const local = await getLocalFallbackData();
    return local.skills || [];
}

export async function getExperience() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('experience')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) return data;
        }
    }
    const local = await getLocalFallbackData();
    return local.experience || [];
}

export async function getTestimonials() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('testimonials')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) return data;
        }
    }
    const local = await getLocalFallbackData();
    return local.testimonials || [];
}

export async function getApps() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('apps')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) return data;
        }
    }
    const local = await getLocalFallbackData();
    return local.apps || [];
}

export async function getContact() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase.from('contact').select('*').eq('status', 'published').limit(1).single();
            if (data) return data;
        }
    }
    return {
        email: 'bartolopaul11@gmail.com',
        location: 'Philippines',
        availability_status: 'Available for Freelance & Full-time'
    };
}

export async function getSocialLinks() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase
                .from('social_links')
                .select('*')
                .eq('status', 'published')
                .eq('is_visible', true)
                .order('display_order', { ascending: true });
            if (data && data.length > 0) return data;
        }
    }
    return [
        { platform: 'Facebook', url: 'https://www.facebook.com/Paul.Brtl', icon: 'Facebook' },
        { platform: 'Instagram', url: 'https://www.instagram.com/jst__pol/', icon: 'Instagram' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/paul-bartolo-782b13299/', icon: 'Linkedin' },
        { platform: 'GitHub', url: 'https://github.com/YUKILL-CLOUD', icon: 'Github' },
        { platform: 'Upwork', url: 'https://www.upwork.com/freelancers/~01d03d565130197ee3', icon: 'Briefcase' }
    ];
}

export async function getSettings() {
    if (isSupabaseConfigured) {
        const supabase = getSupabaseClient();
        if (supabase) {
            const { data } = await supabase.from('settings').select('*').limit(1).single();
            if (data) return data;
        }
    }
    return {
        seo_title: 'Paul Bernard Bartolo | Full Stack Developer & Kajabi/GHL Expert',
        seo_description: 'Full Stack Developer, Kajabi & GHL Expert crafting scalable web applications and marketing automations.'
    };
}

export async function getContent() {
    const [hero, projects, services, skills, experience, testimonials, apps, contact, socialLinks, settings] = await Promise.all([
        getHero(),
        getProjects(),
        getServices(),
        getSkills(),
        getExperience(),
        getTestimonials(),
        getApps(),
        getContact(),
        getSocialLinks(),
        getSettings()
    ]);

    const local = await getLocalFallbackData();

    return {
        profile: {
            name: hero.name,
            role: hero.role,
            location: hero.location,
            bio: hero.bio,
            avatar: hero.avatar || local.profile?.avatar
        },
        stats: [
            { label: 'Years Experience', value: hero.years_exp || '7+' },
            { label: 'Projects Completed', value: hero.projects_completed || '50+' },
            { label: 'Clients', value: hero.clients_count || '30+' }
        ],
        projects,
        services,
        skills,
        experience,
        testimonials,
        apps,
        contact,
        socialLinks,
        settings
    };
}
