'use client';

import React, { useState, useEffect } from 'react';
import { getSettingsAction } from '@/app/admin/actions/fetchers';
import { updateSettingsAction } from '@/app/admin/actions/settings';
import { ImageUploader } from '@/components/admin/image-uploader';
import { Button } from '@/components/ui/button';
import { Settings, Save, CheckCircle2, FileText, Globe, BarChart2, ShieldCheck, Loader2 } from 'lucide-react';

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
                    <p className="text-xs text-zinc-400 mt-1">Manage search engine metadata, resume download link, analytics, and branding</p>
                </div>
            </div>

            {message && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> {message}
                </div>
            )}

            <form onSubmit={handleSave} className="space-y-6">
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

                {/* Resume PDF & Assets */}
                <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 space-y-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" /> Resume PDF & Assets
                    </h2>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Resume Download URL</label>
                        <input
                            type="url"
                            value={form.resume_url}
                            onChange={(e) => setForm({ ...form, resume_url: e.target.value })}
                            placeholder="https://example.com/resume.pdf"
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                {/* Analytics & Tracking */}
                <div className="bg-zinc-900/60 p-6 rounded-xl border border-zinc-800 space-y-4">
                    <h2 className="text-base font-semibold text-white flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-primary" /> Analytics & Tracking
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Google Analytics ID</label>
                            <input
                                type="text"
                                value={form.google_analytics_id}
                                onChange={(e) => setForm({ ...form, google_analytics_id: e.target.value })}
                                placeholder="G-XXXXXXXXXX"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                            />
                        </div>
                        <div className="space-y-1">
                            <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Plausible Analytics ID</label>
                            <input
                                type="text"
                                value={form.analytics_id}
                                onChange={(e) => setForm({ ...form, analytics_id: e.target.value })}
                                placeholder="domain.com"
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
