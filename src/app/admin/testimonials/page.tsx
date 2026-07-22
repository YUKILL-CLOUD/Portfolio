'use client';

import React, { useState, useEffect } from 'react';
import { getTestimonialsAction } from '@/app/admin/actions/fetchers';
import { saveTestimonialAction, deleteTestimonialAction } from '@/app/admin/actions/testimonials';
import { reorderItemsAction } from '@/app/admin/actions/reorder';
import { SortableList } from '@/components/admin/sortable-list';
import { ImageUploader } from '@/components/admin/image-uploader';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { MessageSquareQuote, Plus, Trash2, Edit3, X, Loader2, Star } from 'lucide-react';

export default function TestimonialsEditorPage() {
    const [testimonials, setTestimonials] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const [form, setForm] = useState({
        id: '',
        name: '',
        role: '',
        content: '',
        avatar: '',
        rating: 5,
        status: 'published'
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const list = await getTestimonialsAction();
        setTestimonials(list || []);
        setLoading(false);
    }

    function handleOpenModal(item: any = null) {
        if (item) {
            setEditingItem(item);
            setForm({
                id: item.id || '',
                name: item.name || '',
                role: item.role || '',
                content: item.content || '',
                avatar: item.avatar || '',
                rating: item.rating || 5,
                status: item.status || 'published'
            });
        } else {
            setEditingItem(null);
            setForm({
                id: '',
                name: '',
                role: '',
                content: '',
                avatar: '',
                rating: 5,
                status: 'published'
            });
        }
        setModalOpen(true);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        const res = await saveTestimonialAction(form);
        if (res.success) {
            setModalOpen(false);
            loadData();
        } else {
            alert(res.message || 'Failed to save testimonial');
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this testimonial?')) return;
        const res = await deleteTestimonialAction(id);
        if (res.success) loadData();
    }

    async function handleReorder(newItems: any[]) {
        setTestimonials(newItems);
        const reorderPayload = newItems.map((item, idx) => ({ id: item.id, display_order: idx + 1 }));
        await reorderItemsAction('testimonials', reorderPayload);
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
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <MessageSquareQuote className="h-6 w-6 text-primary" /> Client Testimonials
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Manage client reviews and reorder testimonial cards</p>
                </div>
                <Button variant="neon" size="sm" onClick={() => handleOpenModal()}>
                    <Plus className="h-4 w-4 mr-1" /> Add Testimonial
                </Button>
            </div>

            <SortableList
                items={testimonials}
                onReorder={handleReorder}
                renderItem={(item) => (
                    <div className="flex items-center justify-between w-full">
                        <div>
                            <h3 className="text-sm font-semibold text-white">{item.name} <span className="text-xs text-zinc-500 font-normal">({item.role})</span></h3>
                            <p className="text-xs text-zinc-400 max-w-md truncate">"{item.content}"</p>
                        </div>
                        <div className="flex items-center gap-3">
                            <StatusBadge status={item.status || 'published'} />
                            <Button variant="ghost" size="sm" onClick={() => handleOpenModal(item)} className="text-zinc-400 hover:text-white">
                                <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(item.id)} className="text-zinc-500 hover:text-red-400">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            />

            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-lg w-full p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h2 className="text-lg font-bold text-white">
                                {editingItem ? 'Edit Testimonial' : 'Add Testimonial'}
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Client Name</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.name}
                                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Role / Company</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.role}
                                        onChange={(e) => setForm({ ...form, role: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Review Content</label>
                                <textarea
                                    rows={3}
                                    required
                                    value={form.content}
                                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <ImageUploader
                                label="Client Avatar Image"
                                value={form.avatar}
                                onChange={(url) => setForm({ ...form, avatar: url })}
                            />

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-400">Status:</label>
                                    <select
                                        value={form.status}
                                        onChange={(e) => setForm({ ...form, status: e.target.value as any })}
                                        className="bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-white"
                                    >
                                        <option value="published">Published</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>Cancel</Button>
                                    <Button type="submit" variant="neon" size="sm">Save Testimonial</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
