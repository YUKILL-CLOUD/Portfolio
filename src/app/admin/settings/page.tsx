'use client';

import React, { useState, useEffect } from 'react';
import { getSettingsAction } from '@/app/admin/actions/fetchers';
import { updateSettingsAction } from '@/app/admin/actions/settings';
import { ImageUploader } from '@/components/admin/image-uploader';
import { Button } from '@/components/ui/button';
import { Settings, Save, CheckCircle2, FileText, Globe, BarChart2, Github, Sparkles, Loader2 } from 'lucide-react';

export default function SettingsEditorPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        seo_title: 'Paul Bernard Bartolo | Full Stack Developer & Kajabi/GHL Expert',
        seo_description: 'Full Stack Developer, Kajabi & GHL Expert crafting scalable web applications and marketing automations.',
        og_image: '',
        favicon: '',
        resume_url: '',
        automation_samples_url: '',
        work_with_me_title: 'Let\'s build systems that save time, increase revenue, and scale your business.',
        work_with_me_subtitle: 'Available for full-stack web applications, Kajabi & GoHighLevel sales funnels, and CRM automation architecture.',
        work_with_me_cta_label: 'Start a Project',
        github_username: 'YUKILL-CLOUD',
        analytics_id: '',
        google_analytics_id: '',
        site_name: 'Paul Bernard Bartolo Portfolio'
    });

    useEffect(() => {
        getSettingsAction().then((data: any) => {
            if (data) {
                setForm({
                    seo_title: data.seo_title || 'Paul Bernard Bartolo | Full Stack Developer & Kajabi/GHL Expert',
                    seo_description: data.seo_description || 'Full Stack Developer, Kajabi & GHL Expert crafting scalable web applications and marketing automations.',
                    og_image: data.og_image || '',
                    favicon: data.favicon || '',
                    resume_url: data.resume_url || '',
                    automation_samples_url: data.automation_samples_url || '',
                    work_with_me_title: data.work_with_me_title || 'Let\'s build systems that save time, increase revenue, and scale your business.',
                    work_with_me_subtitle: data.work_with_me_subtitle || 'Available for full-stack web applications, Kajabi & GoHighLevel sales funnels, and CRM automation architecture.',
                    work_with_me_cta_label: data.work_with_me_cta_label || 'Start a Project',
                    github_username: data.github_username || 'YUKILL-CLOUD',
                    analytics_id: data.analytics_id || '',
                    google_analytics_id: data.google_analytics_id || '',
                    site_name: data.site_name || 'Paul Bernard Bartolo Portfolio'
                });
            }
            setLoading(false);
        });
    }, []);

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        const res = await updateSettingsAction(form);
        if (res.success) {
            setMessage('Site settings updated successfully!');
        } else {
            alert(res.message || 'Failed to update settings');
        }
        setSaving(false);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-8 max-w-4xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <Settings className="h-6 w-6 text-primary" /> Site-Wide Settings & SEO
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Manage search engine metadata, resume download link, banner content, and GitHub</p>
                </div>
            </div>

            {message && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> {message}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
                {/* Work With Me Banner Settings */}
                <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 space-y-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <Sparkles className="h-5 w-5 text-primary" /> "Work With Me" Banner Controls
                    </h2>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Banner Title</label>
                        <input
                            type="text"
                            required
                            value={form.work_with_me_title}
                            onChange={(e) => setForm({ ...form, work_with_me_title: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Banner Subtitle / Description</label>
                        <textarea
                            rows={2}
                            value={form.work_with_me_subtitle}
                            onChange={(e) => setForm({ ...form, work_with_me_subtitle: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">CTA Button Label</label>
                        <input
                            type="text"
                            value={form.work_with_me_cta_label}
                            onChange={(e) => setForm({ ...form, work_with_me_cta_label: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* GitHub Integration */}
                <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 space-y-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <Github className="h-5 w-5 text-primary" /> GitHub Activity Widget
                    </h2>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">GitHub Username</label>
                        <input
                            type="text"
                            required
                            value={form.github_username}
                            onChange={(e) => setForm({ ...form, github_username: e.target.value })}
                            placeholder="YUKILL-CLOUD"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* SEO Metadata Section */}
                <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 space-y-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <Globe className="h-5 w-5 text-primary" /> Search Engine Optimization (SEO)
                    </h2>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Meta Title Tag</label>
                        <input
                            type="text"
                            required
                            value={form.seo_title}
                            onChange={(e) => setForm({ ...form, seo_title: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Meta Description</label>
                        <textarea
                            rows={3}
                            required
                            value={form.seo_description}
                            onChange={(e) => setForm({ ...form, seo_description: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    <ImageUploader
                        label="Open Graph (OG) Social Card Image"
                        value={form.og_image}
                        onChange={(url) => setForm({ ...form, og_image: url })}
                    />
                </div>

                {/* Resume PDF & Asset Links */}
                <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 space-y-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" /> Downloadable Assets
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Resume PDF Download Link</label>
                            <input
                                type="url"
                                value={form.resume_url}
                                onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
                                placeholder="https://example.com/resume.pdf"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Automation Samples Link</label>
                            <input
                                type="url"
                                value={form.automation_samples_url}
                                onChange={(e) => setForm({ ...form, automation_samples_url: e.target.value })}
                                placeholder="https://example.com/samples.pdf"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                    </div>
                </div>

                <div className="flex justify-end pt-2">
                    <Button type="submit" variant="neon" size="lg" disabled={saving}>
                        <Save className="h-4 w-4 mr-2" /> Save Site Settings
                    </Button>
                </div>
            </form>
        </div>
    );
}
