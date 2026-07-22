-- Swift Sunspot CMS Database Schema (Supabase) - Phase 3 Extended

-- Create custom enum types
DO $$ BEGIN
    CREATE TYPE content_status AS ENUM ('draft', 'published');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 1. HERO TABLE
CREATE TABLE IF NOT EXISTS public.hero (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL DEFAULT 'Paul Bernard Bartolo',
    role TEXT NOT NULL DEFAULT 'Full Stack Developer, Kajabi & GHL Expert',
    location TEXT DEFAULT 'Philippines',
    bio TEXT,
    avatar TEXT,
    cta_primary_label TEXT DEFAULT 'View Projects',
    cta_primary_link TEXT DEFAULT '#projects',
    cta_secondary_label TEXT DEFAULT 'Get In Touch',
    cta_secondary_link TEXT DEFAULT '#contact',
    years_exp TEXT DEFAULT '7+',
    projects_completed TEXT DEFAULT '50+',
    clients_count TEXT DEFAULT '30+',
    automation_years TEXT DEFAULT '4+',
    resume_url TEXT,
    automation_samples_url TEXT,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 2. STATISTICS TABLE
CREATE TABLE IF NOT EXISTS public.statistics (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    label TEXT NOT NULL,
    value TEXT NOT NULL,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 3. SERVICES TABLE
CREATE TABLE IF NOT EXISTS public.services (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT DEFAULT 'Code',
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 4. PROJECTS TABLE (Phase 3 Extended Case Study Fields)
CREATE TABLE IF NOT EXISTS public.projects (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    title TEXT NOT NULL,
    slug TEXT UNIQUE,
    category TEXT NOT NULL,
    image TEXT,
    gallery TEXT[] DEFAULT '{}',
    link TEXT,
    github_url TEXT,
    description TEXT NOT NULL,
    long_description TEXT,
    problem TEXT,
    solution TEXT,
    key_features TEXT[] DEFAULT '{}',
    architecture TEXT,
    architecture_image TEXT,
    engineering_challenges TEXT,
    results TEXT,
    lessons_learned TEXT,
    technologies TEXT[] DEFAULT '{}',
    featured BOOLEAN DEFAULT FALSE,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 5. SKILLS TABLE
CREATE TABLE IF NOT EXISTS public.skills (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    level INT NOT NULL DEFAULT 90,
    category TEXT DEFAULT 'Full Stack Dev',
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 6. EXPERIENCE TABLE
CREATE TABLE IF NOT EXISTS public.experience (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company TEXT NOT NULL,
    role TEXT NOT NULL,
    period TEXT NOT NULL,
    description TEXT NOT NULL,
    technologies TEXT[] DEFAULT '{}',
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 7. TESTIMONIALS TABLE
CREATE TABLE IF NOT EXISTS public.testimonials (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    role TEXT NOT NULL,
    content TEXT NOT NULL,
    avatar TEXT,
    rating INT DEFAULT 5,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 8. APPS & TOOLS TABLE
CREATE TABLE IF NOT EXISTS public.apps (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name TEXT NOT NULL,
    icon TEXT,
    category TEXT DEFAULT 'Development',
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 9. SOCIAL LINKS TABLE
CREATE TABLE IF NOT EXISTS public.social_links (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    platform TEXT NOT NULL,
    url TEXT NOT NULL,
    icon TEXT,
    display_order INT DEFAULT 0,
    is_visible BOOLEAN DEFAULT TRUE,
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 10. CONTACT TABLE
CREATE TABLE IF NOT EXISTS public.contact (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email TEXT DEFAULT 'bartolopaul11@gmail.com',
    phone TEXT,
    location TEXT DEFAULT 'Philippines',
    availability_status TEXT DEFAULT 'Available for Freelance & Full-time',
    response_time TEXT DEFAULT 'Within 24 hours',
    status content_status DEFAULT 'published',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- 11. SETTINGS TABLE (Phase 3 Extended Settings)
CREATE TABLE IF NOT EXISTS public.settings (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    seo_title TEXT DEFAULT 'Paul Bernard Bartolo | Full Stack Developer & Kajabi/GHL Expert',
    seo_description TEXT DEFAULT 'Full Stack Developer, Kajabi & GHL Expert crafting scalable web applications and marketing automations.',
    og_image TEXT,
    favicon TEXT,
    resume_url TEXT,
    automation_samples_url TEXT,
    work_with_me_title TEXT DEFAULT 'Let''s build systems that save time, increase revenue, and scale your business.',
    work_with_me_subtitle TEXT DEFAULT 'Available for full-stack web applications, Kajabi & GoHighLevel sales funnels, and CRM automation architecture.',
    work_with_me_cta_label TEXT DEFAULT 'Start a Project',
    github_username TEXT DEFAULT 'YUKILL-CLOUD',
    analytics_id TEXT,
    google_analytics_id TEXT,
    site_name TEXT DEFAULT 'Paul Bernard Bartolo Portfolio',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    created_by UUID,
    updated_by UUID
);

-- ENABLE ROW LEVEL SECURITY (RLS) ON ALL TABLES
ALTER TABLE public.hero ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.statistics ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.services ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.projects ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.skills ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.experience ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.testimonials ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.apps ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.social_links ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;

-- PUBLIC ACCESS POLICIES (Read published items)
CREATE POLICY "Allow public read access to published hero" ON public.hero FOR SELECT USING (status = 'published');
CREATE POLICY "Allow public read access to published statistics" ON public.statistics FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published services" ON public.services FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published projects" ON public.projects FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published skills" ON public.skills FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published experience" ON public.experience FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published testimonials" ON public.testimonials FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published apps" ON public.apps FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published social_links" ON public.social_links FOR SELECT USING (status = 'published' AND is_visible = TRUE);
CREATE POLICY "Allow public read access to published contact" ON public.contact FOR SELECT USING (status = 'published');
CREATE POLICY "Allow public read access to settings" ON public.settings FOR SELECT USING (TRUE);

-- AUTHENTICATED ADMIN FULL ACCESS POLICIES
CREATE POLICY "Allow authenticated full access to hero" ON public.hero FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to statistics" ON public.statistics FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to services" ON public.services FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to projects" ON public.projects FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to skills" ON public.skills FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to experience" ON public.experience FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to testimonials" ON public.testimonials FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to apps" ON public.apps FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to social_links" ON public.social_links FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to contact" ON public.contact FOR ALL USING (auth.role() = 'authenticated');
CREATE POLICY "Allow authenticated full access to settings" ON public.settings FOR ALL USING (auth.role() = 'authenticated');
