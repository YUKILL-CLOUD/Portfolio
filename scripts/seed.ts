import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';

async function seed() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseServiceKey) {
        console.error('❌ Error: NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY environment variables are required for seeding.');
        console.log('💡 Please add these variables to your .env.local file first.');
        process.exit(1);
    }

    const supabase = createClient(supabaseUrl, supabaseServiceKey);
    const jsonPath = path.join(process.cwd(), 'src/data/portfolio.json');

    if (!fs.existsSync(jsonPath)) {
        console.error('❌ Error: src/data/portfolio.json not found.');
        process.exit(1);
    }

    console.log('📦 Reading portfolio.json...');
    const data = JSON.parse(fs.readFileSync(jsonPath, 'utf-8'));

    // 1. Hero
    if (data.profile) {
        console.log('⏳ Seeding Hero section...');
        const { error } = await supabase.from('hero').upsert({
            name: data.profile.name,
            role: data.profile.role,
            location: data.profile.location,
            bio: data.profile.bio,
            avatar: data.profile.avatar,
            years_exp: data.stats?.[0]?.value || '7+',
            projects_completed: data.stats?.[1]?.value || '50+',
            clients_count: data.stats?.[2]?.value || '30+',
            status: 'published'
        });
        if (error) console.error('Hero seed error:', error.message);
    }

    // 2. Statistics
    if (data.stats && Array.isArray(data.stats)) {
        console.log('⏳ Seeding Statistics...');
        for (let i = 0; i < data.stats.length; i++) {
            const stat = data.stats[i];
            await supabase.from('statistics').upsert({
                label: stat.label,
                value: stat.value,
                display_order: i + 1,
                status: 'published'
            });
        }
    }

    // 3. Services
    if (data.services && Array.isArray(data.services)) {
        console.log('⏳ Seeding Services...');
        for (let i = 0; i < data.services.length; i++) {
            const service = data.services[i];
            await supabase.from('services').upsert({
                title: service.title,
                description: service.description,
                icon: service.icon || 'Code',
                display_order: i + 1,
                status: 'published'
            });
        }
    }

    // 4. Projects
    if (data.projects && Array.isArray(data.projects)) {
        console.log('⏳ Seeding Projects...');
        for (let i = 0; i < data.projects.length; i++) {
            const proj = data.projects[i];
            await supabase.from('projects').upsert({
                title: proj.title,
                category: proj.category,
                image: proj.image,
                gallery: proj.gallery || [],
                link: proj.link,
                description: proj.description,
                long_description: proj.longDescription || proj.description,
                technologies: proj.technologies || [],
                display_order: i + 1,
                status: 'published'
            });
        }
    }

    // 5. Skills
    if (data.skills && Array.isArray(data.skills)) {
        console.log('⏳ Seeding Skills...');
        for (let i = 0; i < data.skills.length; i++) {
            const skill = data.skills[i];
            await supabase.from('skills').upsert({
                name: skill.name,
                level: skill.level || 90,
                category: 'Development',
                display_order: i + 1,
                status: 'published'
            });
        }
    }

    // 6. Experience
    if (data.experience && Array.isArray(data.experience)) {
        console.log('⏳ Seeding Experience...');
        for (let i = 0; i < data.experience.length; i++) {
            const exp = data.experience[i];
            await supabase.from('experience').upsert({
                company: exp.company,
                role: exp.role,
                period: exp.period,
                description: exp.description,
                display_order: i + 1,
                status: 'published'
            });
        }
    }

    // 7. Testimonials
    if (data.testimonials && Array.isArray(data.testimonials)) {
        console.log('⏳ Seeding Testimonials...');
        for (let i = 0; i < data.testimonials.length; i++) {
            const t = data.testimonials[i];
            await supabase.from('testimonials').upsert({
                name: t.name,
                role: t.role,
                content: t.content,
                avatar: t.avatar,
                display_order: i + 1,
                status: 'published'
            });
        }
    }

    // 8. Contact & Social Links
    console.log('⏳ Seeding Contact & Social links...');
    await supabase.from('contact').upsert({
        email: 'bartolopaul11@gmail.com',
        location: 'Philippines',
        availability_status: 'Available for Freelance & Full-time',
        status: 'published'
    });

    const socialPlatforms = [
        { platform: 'Facebook', url: 'https://www.facebook.com/Paul.Brtl', icon: 'Facebook' },
        { platform: 'Instagram', url: 'https://www.instagram.com/jst__pol/', icon: 'Instagram' },
        { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/paul-bartolo-782b13299/', icon: 'Linkedin' },
        { platform: 'GitHub', url: 'https://github.com/YUKILL-CLOUD', icon: 'Github' },
        { platform: 'Upwork', url: 'https://www.upwork.com/freelancers/~01d03d565130197ee3', icon: 'Briefcase' }
    ];

    for (let i = 0; i < socialPlatforms.length; i++) {
        await supabase.from('social_links').upsert({
            ...socialPlatforms[i],
            display_order: i + 1,
            status: 'published'
        });
    }

    // 9. Default Settings
    console.log('⏳ Seeding Default Settings...');
    await supabase.from('settings').upsert({
        seo_title: 'Paul Bernard Bartolo | Full Stack Developer & Kajabi/GHL Expert',
        seo_description: 'Full Stack Developer, Kajabi & GHL Expert crafting scalable web applications and marketing automations.',
        site_name: 'Paul Bernard Bartolo Portfolio'
    });

    console.log('✅ Seeding completed successfully!');
}

seed().catch((err) => {
    console.error('❌ Seeding failed:', err);
    process.exit(1);
});
