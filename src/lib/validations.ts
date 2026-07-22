import { z } from 'zod';

export const statusEnum = z.enum(['draft', 'published']);

export const heroSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    role: z.string().min(1, 'Role is required'),
    location: z.string().optional(),
    bio: z.string().optional(),
    avatar: z.string().optional(),
    cta_primary_label: z.string().optional(),
    cta_primary_link: z.string().optional(),
    cta_secondary_label: z.string().optional(),
    cta_secondary_link: z.string().optional(),
    years_exp: z.string().optional(),
    projects_completed: z.string().optional(),
    clients_count: z.string().optional(),
    automation_years: z.string().optional(),
    resume_url: z.string().optional(),
    automation_samples_url: z.string().optional(),
    status: statusEnum.default('published')
});

export const serviceSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Title is required'),
    description: z.string().min(1, 'Description is required'),
    icon: z.string().default('Code'),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const projectSchema = z.object({
    id: z.string().optional(),
    title: z.string().min(1, 'Title is required'),
    slug: z.string().optional(),
    category: z.string().min(1, 'Category is required'),
    image: z.string().optional(),
    gallery: z.array(z.string()).default([]),
    link: z.string().optional(),
    github_url: z.string().optional(),
    description: z.string().min(1, 'Short description is required'),
    long_description: z.string().optional(),
    problem: z.string().optional(),
    solution: z.string().optional(),
    key_features: z.array(z.string()).default([]),
    architecture: z.string().optional(),
    architecture_image: z.string().optional(),
    engineering_challenges: z.string().optional(),
    results: z.string().optional(),
    lessons_learned: z.string().optional(),
    technologies: z.array(z.string()).default([]),
    featured: z.boolean().default(false),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const skillSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Skill name is required'),
    level: z.number().min(0).max(100).default(90),
    category: z.string().default('Full Stack Dev'),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const experienceSchema = z.object({
    id: z.string().optional(),
    company: z.string().min(1, 'Company is required'),
    role: z.string().min(1, 'Role is required'),
    period: z.string().min(1, 'Period is required'),
    description: z.string().min(1, 'Description is required'),
    technologies: z.array(z.string()).default([]),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const testimonialSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'Client name is required'),
    role: z.string().min(1, 'Role is required'),
    content: z.string().min(1, 'Review content is required'),
    avatar: z.string().optional(),
    rating: z.number().int().min(1).max(5).default(5),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const appSchema = z.object({
    id: z.string().optional(),
    name: z.string().min(1, 'App name is required'),
    icon: z.string().optional(),
    category: z.string().default('Development'),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const socialLinkSchema = z.object({
    id: z.string().optional(),
    platform: z.string().min(1, 'Platform name is required'),
    url: z.string().url('Invalid URL format'),
    icon: z.string().optional(),
    display_order: z.number().int().default(0),
    is_visible: z.boolean().default(true),
    status: statusEnum.default('published')
});

export const contactSchema = z.object({
    email: z.string().email('Invalid email address'),
    phone: z.string().optional(),
    location: z.string().optional(),
    availability_status: z.string().optional(),
    response_time: z.string().optional(),
    status: statusEnum.default('published')
});

export const settingsSchema = z.object({
    seo_title: z.string().optional(),
    seo_description: z.string().optional(),
    og_image: z.string().optional(),
    favicon: z.string().optional(),
    resume_url: z.string().optional(),
    automation_samples_url: z.string().optional(),
    work_with_me_title: z.string().optional(),
    work_with_me_subtitle: z.string().optional(),
    work_with_me_cta_label: z.string().optional(),
    github_username: z.string().optional(),
    analytics_id: z.string().optional(),
    google_analytics_id: z.string().optional(),
    site_name: z.string().optional()
});
