'use client';

import React, { useState, useEffect } from 'react';
import { updateHeroAction } from '@/app/admin/actions/hero';
import { getHeroAction } from '@/app/admin/actions/fetchers';
import { ImageUploader } from '@/components/admin/image-uploader';
import { Button } from '@/components/ui/button';
import { Save, User, Loader2, CheckCircle2 } from 'lucide-react';

export default function HeroEditorPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [formData, setFormData] = useState({
        name: 'Paul Bernard Bartolo',
        role: 'Full Stack Developer, Kajabi & GHL Expert',
        location: 'Philippines',
        bio: '',
        avatar: '/pp.png',
        years_exp: '7+',
        projects_completed: '50+',
        clients_count: '30+',
        resume_url: '',
        status: 'published'
    });

    useEffect(() => {
        getHeroAction().then((data: any) => {
            if (data) {
                setFormData({
                    name: data.name || '',
                    role: data.role || '',
                    location: data.location || 'Philippines',
                    bio: data.bio || '',
                    avatar: data.avatar || '/pp.png',
                    years_exp: data.years_exp || '7+',
                    projects_completed: data.projects_completed || '50+',
                    clients_count: data.clients_count || '30+',
                    resume_url: data.resume_url || '',
                    status: data.status || 'published'
                });
            }
            setLoading(false);
        });
    }, []);

    async function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        const res = await updateHeroAction(formData);
        if (res.success) {
            setMessage('Hero profile updated successfully!');
        } else {
            setMessage(res.message || 'Failed to update hero section');
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
        <div className="space-y-6 max-w-4xl">
            <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <User className="h-6 w-6 text-primary" /> Hero & Bio Editor
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Manage your headline, role, stats, avatar, and short bio</p>
                </div>
            </div>

            {message && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> {message}
                </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6 bg-zinc-900/60 p-6 rounded-xl border border-zinc-800">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Full Name</label>
                        <input
                            type="text"
                            required
                            value={formData.name}
                            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Role / Headline</label>
                        <input
                            type="text"
                            required
                            value={formData.role}
                            onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Bio Summary</label>
                    <textarea
                        rows={3}
                        value={formData.bio}
                        onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Years Experience</label>
                        <input
                            type="text"
                            value={formData.years_exp}
                            onChange={(e) => setFormData({ ...formData, years_exp: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Projects Completed</label>
                        <input
                            type="text"
                            value={formData.projects_completed}
                            onChange={(e) => setFormData({ ...formData, projects_completed: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Clients Count</label>
                        <input
                            type="text"
                            value={formData.clients_count}
                            onChange={(e) => setFormData({ ...formData, clients_count: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <ImageUploader
                    label="Profile Avatar Image"
                    value={formData.avatar}
                    onChange={(url) => setFormData({ ...formData, avatar: url })}
                />

                <div className="flex justify-end pt-4 border-t border-zinc-800">
                    <Button type="submit" variant="neon" size="lg" disabled={saving}>
                        {saving ? 'Saving...' : (
                            <span className="flex items-center gap-2">
                                <Save className="h-4 w-4" /> Save Hero Section
                            </span>
                        )}
                    </Button>
                </div>
            </form>
        </div>
    );
}
