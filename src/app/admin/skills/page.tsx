'use client';

import React, { useState, useEffect } from 'react';
import { getSkillsAction } from '@/app/admin/actions/fetchers';
import { saveSkillAction, deleteSkillAction } from '@/app/admin/actions/skills';
import { reorderItemsAction } from '@/app/admin/actions/reorder';
import { SortableList } from '@/components/admin/sortable-list';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { GraduationCap, Plus, Trash2, Edit3, X, Loader2 } from 'lucide-react';

export default function SkillsEditorPage() {
    const [skills, setSkills] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<any>(null);

    const [form, setForm] = useState({
        id: '',
        name: '',
        level: 90,
        category: 'Development',
        status: 'published'
    });

    useEffect(() => {
        loadData();
    }, []);

    async function loadData() {
        const list = await getSkillsAction();
        setSkills(list || []);
        setLoading(false);
    }

    function handleOpenModal(item: any = null) {
        if (item) {
            setEditingItem(item);
            setForm({
                id: item.id || '',
                name: item.name || '',
                level: item.level || 90,
                category: item.category || 'Development',
                status: item.status || 'published'
            });
        } else {
            setEditingItem(null);
            setForm({
                id: '',
                name: '',
                level: 90,
                category: 'Development',
                status: 'published'
            });
        }
        setModalOpen(true);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        const res = await saveSkillAction({
            ...form,
            level: Number(form.level)
        });
        if (res.success) {
            setModalOpen(false);
            loadData();
        } else {
            alert(res.message || 'Failed to save skill');
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this skill?')) return;
        const res = await deleteSkillAction(id);
        if (res.success) loadData();
    }

    async function handleReorder(newItems: any[]) {
        setSkills(newItems);
        const reorderPayload = newItems.map((item, idx) => ({ id: item.id, display_order: idx + 1 }));
        await reorderItemsAction('skills', reorderPayload);
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
                        <GraduationCap className="h-6 w-6 text-primary" /> Skills & Competencies
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Manage proficiency percentages and reorder skills via drag & drop</p>
                </div>
                <Button variant="neon" size="sm" onClick={() => handleOpenModal()}>
                    <Plus className="h-4 w-4 mr-1" /> Add Skill
                </Button>
            </div>

            <SortableList
                items={skills}
                onReorder={handleReorder}
                renderItem={(item) => (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-4">
                            <span className="font-bold text-sm text-white">{item.name}</span>
                            <span className="text-xs px-2 py-0.5 rounded bg-zinc-800 text-primary font-mono font-semibold">{item.level}%</span>
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
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-md w-full p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h2 className="text-lg font-bold text-white">
                                {editingItem ? 'Edit Skill' : 'Add New Skill'}
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Skill Name</label>
                                <input
                                    type="text"
                                    required
                                    value={form.name}
                                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <div className="flex justify-between items-center">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Proficiency Level</label>
                                    <span className="text-xs font-mono font-bold text-primary">{form.level}%</span>
                                </div>
                                <input
                                    type="range"
                                    min="0"
                                    max="100"
                                    value={form.level}
                                    onChange={(e) => setForm({ ...form, level: Number(e.target.value) })}
                                    className="w-full accent-primary cursor-pointer"
                                />
                            </div>

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
                                    <Button type="submit" variant="neon" size="sm">Save Skill</Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
