'use client';

import React, { useState, useEffect } from 'react';
import { getProjectsAction } from '@/app/admin/actions/fetchers';
import { saveProjectAction, deleteProjectAction } from '@/app/admin/actions/projects';
import { reorderItemsAction } from '@/app/admin/actions/reorder';
import { SortableList } from '@/components/admin/sortable-list';
import { TiptapEditor } from '@/components/admin/tiptap-editor';
import { ImageUploader } from '@/components/admin/image-uploader';
import { StatusBadge } from '@/components/admin/status-badge';
import { Button } from '@/components/ui/button';
import { FolderKanban, Plus, Trash2, Edit3, X, Check, ExternalLink, Loader2 } from 'lucide-react';

export default function ProjectsEditorPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        id: '',
        title: '',
        category: '',
        description: '',
        long_description: '',
        technologies: '' as any,
        link: '',
        github_url: '',
        image: '',
        status: 'published'
    });

    useEffect(() => {
        loadProjects();
    }, []);

    async function loadProjects() {
        const list = await getProjectsAction();
        setProjects(list || []);
        setLoading(false);
    }

    function handleOpenModal(project: any = null) {
        if (project) {
            setEditingProject(project);
            setForm({
                id: project.id || '',
                title: project.title || '',
                category: project.category || '',
                description: project.description || '',
                long_description: project.longDescription || project.long_description || '',
                technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
                link: project.link || '',
                github_url: project.github_url || '',
                image: project.image || '',
                status: project.status || 'published'
            });
        } else {
            setEditingProject(null);
            setForm({
                id: '',
                title: '',
                category: '',
                description: '',
                long_description: '',
                technologies: '',
                link: '',
                github_url: '',
                image: '',
                status: 'published'
            });
        }
        setModalOpen(true);
    }

    async function handleSave(e: React.FormEvent) {
        e.preventDefault();
        const techArray = typeof form.technologies === 'string'
            ? form.technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
            : form.technologies;

        const payload = {
            ...form,
            technologies: techArray
        };

        const res = await saveProjectAction(payload);
        if (res.success) {
            setMessage('Project saved successfully!');
            setModalOpen(false);
            loadProjects();
        } else {
            alert(res.message || 'Failed to save project');
        }
    }

    async function handleDelete(id: string) {
        if (!confirm('Are you sure you want to delete this project?')) return;
        const res = await deleteProjectAction(id);
        if (res.success) {
            loadProjects();
        }
    }

    async function handleReorder(newProjects: any[]) {
        setProjects(newProjects);
        const reorderPayload = newProjects.map((p, idx) => ({ id: p.id, display_order: idx + 1 }));
        await reorderItemsAction('projects', reorderPayload);
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-5xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800 pb-4">
                <div>
                    <h1 className="text-2xl font-bold text-white flex items-center gap-2">
                        <FolderKanban className="h-6 w-6 text-primary" /> Projects Manager
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Add, edit, reorder via drag & drop, and control project status</p>
                </div>
                <Button variant="neon" size="sm" onClick={() => handleOpenModal()}>
                    <Plus className="h-4 w-4 mr-1" /> Add Project
                </Button>
            </div>

            {message && (
                <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-400">
                    {message}
                </div>
            )}

            {/* Drag & Drop Projects List */}
            <SortableList
                items={projects}
                onReorder={handleReorder}
                renderItem={(project) => (
                    <div className="flex items-center justify-between w-full">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded bg-zinc-800 overflow-hidden flex items-center justify-center text-xs font-bold text-zinc-400">
                                {project.image ? <img src={project.image} alt="" className="h-full w-full object-cover" /> : 'PJ'}
                            </div>
                            <div>
                                <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                                <span className="text-xs text-zinc-500">{project.category}</span>
                            </div>
                        </div>

                        <div className="flex items-center gap-3">
                            <StatusBadge status={project.status || 'published'} />
                            <Button variant="ghost" size="sm" onClick={() => handleOpenModal(project)} className="text-zinc-400 hover:text-white">
                                <Edit3 className="h-4 w-4" />
                            </Button>
                            <Button variant="ghost" size="sm" onClick={() => handleDelete(project.id)} className="text-zinc-500 hover:text-red-400">
                                <Trash2 className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                )}
            />

            {/* Create/Edit Modal */}
            {modalOpen && (
                <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h2 className="text-lg font-bold text-white">
                                {editingProject ? 'Edit Project' : 'Add New Project'}
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Project Title</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.title}
                                        onChange={(e) => setForm({ ...form, title: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Category</label>
                                    <input
                                        type="text"
                                        required
                                        value={form.category}
                                        onChange={(e) => setForm({ ...form, category: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Short Description</label>
                                <textarea
                                    rows={2}
                                    required
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                />
                            </div>

                            <div className="space-y-1">
                                <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Detailed Description (Tiptap Rich Text)</label>
                                <TiptapEditor
                                    value={form.long_description}
                                    onChange={(html) => setForm({ ...form, long_description: html })}
                                />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Live Project URL</label>
                                    <input
                                        type="url"
                                        value={form.link}
                                        onChange={(e) => setForm({ ...form, link: e.target.value })}
                                        placeholder="https://example.com"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Technologies (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={form.technologies}
                                        onChange={(e) => setForm({ ...form, technologies: e.target.value })}
                                        placeholder="Next.js, Tailwind, Node.js"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            <ImageUploader
                                label="Project Thumbnail Image"
                                value={form.image}
                                onChange={(url) => setForm({ ...form, image: url })}
                            />

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-2">
                                    <label className="text-xs font-semibold text-zinc-400">Publishing Status:</label>
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
                                    <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="neon" size="sm">
                                        Save Project
                                    </Button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
