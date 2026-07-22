'use client';

import React, { useState, useEffect } from 'react';
import { getContactAction, getSocialLinksAction } from '@/app/admin/actions/fetchers';
import { updateContactAction, saveSocialLinkAction, deleteSocialLinkAction } from '@/app/admin/actions/contact';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { Share2, Save, Plus, Trash2, Edit3, X, Loader2, CheckCircle2 } from 'lucide-react';

export default function ContactEditorPage() {
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [message, setMessage] = useState('');
    const [socialLinks, setSocialLinks] = useState<any[]>([]);

    const [contactForm, setContactForm] = useState({
        email: 'bartolopaul11@gmail.com',
        phone: '',
        location: 'Philippines',
        availability_status: 'Available for Freelance & Full-time',
        response_time: 'Within 24 hours',
        status: 'published'
    });

    const [socialModalOpen, setSocialModalOpen] = useState(false);
    const [socialForm, setSocialForm] = useState({
        id: '',
        platform: '',
        url: '',
        icon: 'Link',
        status: 'published'
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const [contactData, socialData] = await Promise.all([
            getContactAction(),
            getSocialLinksAction()
        ]);

        if (contactData) {
            setContactForm({
                email: contactData.email || 'bartolopaul11@gmail.com',
                phone: contactData.phone || '',
                location: contactData.location || 'Philippines',
                availability_status: contactData.availability_status || 'Available for Freelance & Full-time',
                response_time: contactData.response_time || 'Within 24 hours',
                status: contactData.status || 'published'
            });
        }

        setSocialLinks(socialData || []);
        setLoading(false);
    }

    async function handleSaveContact(e: React.FormEvent) {
        e.preventDefault();
        setSaving(true);
        setMessage('');

        const res = await updateContactAction(contactForm);
        if (res.success) {
            setMessage('Contact information updated!');
        } else {
            alert(res.message || 'Failed to update contact info');
        }
        setSaving(false);
    }

    function handleOpenSocialModal(item: any = null) {
        if (item) {
            setSocialForm({
                id: item.id || '',
                platform: item.platform || '',
                url: item.url || '',
                icon: item.icon || 'Link',
                status: item.status || 'published'
            });
        } else {
            setSocialForm({
                id: '',
                platform: '',
                url: '',
                icon: 'Link',
                status: 'published'
            });
        }
        setSocialModalOpen(true);
    }

    async function handleSaveSocial(e: React.FormEvent) {
        e.preventDefault();
        const res = await saveSocialLinkAction(socialForm);
        if (res.success) {
            setSocialModalOpen(false);
            loadData();
        } else {
            alert(res.message || 'Failed to save social link');
        }
    }

    async function handleDeleteSocial(id: string) {
        if (!confirm('Delete this social link?')) return;
        const res = await deleteSocialLinkAction(id);
        if (res.success) loadData();
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
                        <Share2 className="h-6 w-6 text-primary" /> Contact & Social Links
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Manage contact information and social media profile links</p>
                </div>
            </div>

            {message && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400 flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4" /> {message}
                </div>
            )}

            {/* Contact Information Form */}
            <form onSubmit={handleSaveContact} className="space-y-4 bg-zinc-900/60 p-6 rounded-xl border border-zinc-800">
                <h2 className="text-base font-semibold text-white">General Contact Info</h2>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Primary Email</label>
                        <input
                            type="email"
                            required
                            value={contactForm.email}
                            onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Location</label>
                        <input
                            type="text"
                            value={contactForm.location}
                            onChange={(e) => setContactForm({ ...contactForm, location: e.target.value })}
                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                        />
                    </div>
                </div>

                <div className="space-y-1">
                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Availability Status</label>
                    <input
                        type="text"
                        value={contactForm.availability_status}
                        onChange={(e) => setContactForm({ ...contactForm, availability_status: e.target.value })}
                        placeholder="Available for Freelance & Full-time"
                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                    />
                </div>

                <div className="flex justify-end pt-2">
                    <Button type="submit" variant="neon" size="sm" disabled={saving}>
                        <Save className="h-4 w-4 mr-1" /> Save Contact Info
                    </Button>
                </div>
            </form>

            {/* Social Profile Links Manager */}
            <div className="space-y-4 pt-4 border-t border-zinc-800">
                <div className="flex items-center justify-between">
                    <h2 className="text-base font-semibold text-white">Social Profile Buttons</h2>
                    <Button variant="neon" size="sm" onClick={() => handleOpenSocialModal()}>
                        <Plus className="h-4 w-4 mr-1" /> Add Social Link
                    </Button>
                </div>

                <div className="space-y-3">
                    {socialLinks.map((link) => (
                        <div key={link.id || link.platform} className="p-3 bg-zinc-900/60 rounded-xl border border-zinc-800 flex items-center justify-between">
                            <div>
                                <h3 className="text-sm font-semibold text-white">{link.platform}</h3>
                                <a href={link.url} target="_blank" rel="noreferrer" className="text-xs text-primary hover:underline">{link.url}</a>
                            </div>
                            <div className="flex items-center gap-2">
                                <StatusBadge status={link.status || 'published'} />
                                <Button variant="ghost" size="sm" onClick={() => handleOpenSocialModal(link)} className="text-zinc-400 hover:text-white">
                                    <Edit3 className="h-4 w-4" />
                                </Button>
                                <Button variant="ghost" size="sm" onClick={() => handleDeleteSocial(link.id)} className="text-zinc-500 hover:text-red-400">
                                    <Trash2 className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Social Link Modal */}
            {socialModalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h2 className="text-lg font-bold text-white">Add / Edit Social Link</h2>
                            <button onClick={() => setSocialModalOpen(false)} className="text-zinc-500 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSaveSocial} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Platform Name</label>
                                <input
                                    type="text"
                                    required
                                    value={socialForm.platform}
                                    onChange={(e) => setSocialForm({ ...socialForm, platform: e.target.value })}
                                    placeholder="GitHub, LinkedIn, Upwork..."
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Profile URL</label>
                                <input
                                    type="url"
                                    required
                                    value={socialForm.url}
                                    onChange={(e) => setSocialForm({ ...socialForm, url: e.target.value })}
                                    placeholder="https://github.com/username"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-400">Status:</label>
                                    <select
                                        value={socialForm.status}
                                        onChange={(e) => setSocialForm({ ...socialForm, status: e.target.value as any })}
                                        className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="outline" size="sm" onClick={() => setSocialModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" variant="neon" size="sm">Save Link</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
