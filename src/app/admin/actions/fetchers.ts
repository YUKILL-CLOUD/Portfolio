'use server';

import {
    getHero as getHeroContent,
    getProjects as getProjectsContent,
    getProjectBySlug as getProjectBySlugContent,
    getServices as getServicesContent,
    getSkills as getSkillsContent,
    getExperience as getExperienceContent,
    getTestimonials as getTestimonialsContent,
    getApps as getAppsContent,
    getContact as getContactContent,
    getSocialLinks as getSocialLinksContent,
    getSettings as getSettingsContent
} from '@/lib/content';

export async function getHeroAction() {
    return await getHeroContent();
}

export async function getProjectsAction() {
    return await getProjectsContent();
}

export async function getProjectBySlugAction(slug: string) {
    return await getProjectBySlugContent(slug);
}

export async function getServicesAction() {
    return await getServicesContent();
}

export async function getSkillsAction() {
    return await getSkillsContent();
}

export async function getExperienceAction() {
    return await getExperienceContent();
}

export async function getTestimonialsAction() {
    return await getTestimonialsContent();
}

export async function getAppsAction() {
    return await getAppsContent();
}

export async function getContactAction() {
    return await getContactContent();
}

export async function getSocialLinksAction() {
    return await getSocialLinksContent();
}

export async function getSettingsAction() {
    return await getSettingsContent();
}
