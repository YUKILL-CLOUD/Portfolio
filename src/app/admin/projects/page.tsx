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
import { FolderKanban, Plus, Trash2, Edit3, X, Sparkles, Loader2 } from 'lucide-react';

export default function ProjectsEditorPage() {
    const [projects, setProjects] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState<any>(null);
    const [message, setMessage] = useState('');

    const [form, setForm] = useState({
        id: '',
        title: '',
        slug: '',
        category: '',
        description: '',
        long_description: '',
        problem: '',
        solution: '',
        key_features: '' as any,
        architecture: '',
        architecture_image: '',
        engineering_challenges: '',
        results: '',
        lessons_learned: '',
        technologies: '' as any,
        link: '',
        github_url: '',
        image: '',
        featured: false,
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
                slug: project.slug || '',
                category: project.category || '',
                description: project.description || '',
                long_description: project.longDescription || project.long_description || '',
                problem: project.problem || '',
                solution: project.solution || '',
                key_features: Array.isArray(project.key_features) ? project.key_features.join(', ') : '',
                architecture: project.architecture || '',
                architecture_image: project.architecture_image || '',
                engineering_challenges: project.engineering_challenges || '',
                results: project.results || '',
                lessons_learned: project.lessons_learned || '',
                technologies: Array.isArray(project.technologies) ? project.technologies.join(', ') : '',
                link: project.link || '',
                github_url: project.github_url || '',
                image: project.image || '',
                featured: Boolean(project.featured),
                status: project.status || 'published'
            });
        } else {
            setEditingProject(null);
            setForm({
                id: '',
                title: '',
                slug: '',
                category: '',
                description: '',
                long_description: '',
                problem: '',
                solution: '',
                key_features: '',
                architecture: '',
                architecture_image: '',
                engineering_challenges: '',
                results: '',
                lessons_learned: '',
                technologies: '',
                link: '',
                github_url: '',
                image: '',
                featured: false,
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

        const keyFeaturesArray = typeof form.key_features === 'string'
            ? form.key_features.split(',').map((f: string) => f.trim()).filter(Boolean)
            : form.key_features;

        const autoSlug = form.slug || form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)+/g, '');

        const payload = {
            ...form,
            slug: autoSlug,
            technologies: techArray,
            key_features: keyFeaturesArray
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
                        <FolderKanban className="h-6 w-6 text-primary" /> Projects & Case Studies
                    </h1>
                    <p className="text-xs text-zinc-400 mt-1">Manage project case studies, reorder items, and mark featured project</p>
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
                                <div className="flex items-center gap-2">
                                    <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                                    {project.featured && (
                                        <span className="px-2 py-0.2 rounded text-[10px] font-bold bg-primary text-black flex items-center gap-0.5">
                                            <Sparkles className="h-3 w-3" /> Featured
                                        </span>
                                    )}
                                </div>
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
                    <div className="bg-zinc-900 border border-zinc-800 rounded-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto p-6 space-y-6">
                        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
                            <h2 className="text-lg font-bold text-white">
                                {editingProject ? 'Edit Project & Case Study' : 'Add New Project'}
                            </h2>
                            <button onClick={() => setModalOpen(false)} className="text-zinc-500 hover:text-white">
                                <X className="h-5 w-5" />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="space-y-6">
                            {/* General Fields */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-zinc-800 pb-1">1. Basic Details</h3>
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
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">URL Slug (e.g. z-budgeting)</label>
                                        <input
                                            type="text"
                                            value={form.slug}
                                            onChange={(e) => setForm({ ...form, slug: e.target.value })}
                                            placeholder="Auto-generated if empty"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                    <div className="space-y-1 flex items-end">
                                        <label className="flex items-center gap-2 cursor-pointer p-2 rounded-lg bg-zinc-950 border border-zinc-800 w-full">
                                            <input
                                                type="checkbox"
                                                checked={form.featured}
                                                onChange={(e) => setForm({ ...form, featured: e.target.checked })}
                                                className="accent-primary h-4 w-4"
                                            />
                                            <span className="text-xs font-semibold text-white">Set as Featured Hero Project</span>
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Short Summary (Homepage card & preview)</label>
                                    <textarea
                                        rows={2}
                                        required
                                        value={form.description}
                                        onChange={(e) => setForm({ ...form, description: e.target.value })}
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>
                            </div>

                            {/* Case Study Fields */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-zinc-800 pb-1">2. Case Study Deep Dive (/projects/[slug])</h3>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Problem Statement</label>
                                        <textarea
                                            rows={3}
                                            value={form.problem}
                                            onChange={(e) => setForm({ ...form, problem: e.target.value })}
                                            placeholder="What problem did this project solve?"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Solution Statement</label>
                                        <textarea
                                            rows={3}
                                            value={form.solution}
                                            onChange={(e) => setForm({ ...form, solution: e.target.value })}
                                            placeholder="How was the solution engineered?"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Key Features (Comma separated)</label>
                                    <input
                                        type="text"
                                        value={form.key_features}
                                        onChange={(e) => setForm({ ...form, key_features: e.target.value })}
                                        placeholder="Real-time sync, Audio visualizer, Transparent overlay"
                                        className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">System Architecture Breakdown</label>
                                        <textarea
                                            rows={3}
                                            value={form.architecture}
                                            onChange={(e) => setForm({ ...form, architecture: e.target.value })}
                                            placeholder="Architecture overview & data flow"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <ImageUploader
                                        label="Architecture Diagram Image"
                                        value={form.architecture_image}
                                        onChange={(url) => setForm({ ...form, architecture_image: url })}
                                    />
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Engineering Challenges</label>
                                        <textarea
                                            rows={2}
                                            value={form.engineering_challenges}
                                            onChange={(e) => setForm({ ...form, engineering_challenges: e.target.value })}
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                    <div className="space-y-1">
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Results & Metrics</label>
                                        <textarea
                                            rows={2}
                                            value={form.results}
                                            onChange={(e) => setForm({ ...form, results: e.target.value })}
                                            placeholder="e.g. Saved 20 hours/week, 60 FPS performance"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-1">
                                    <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Detailed Description (Tiptap Rich Text)</label>
                                    <TiptapEditor
                                        value={form.long_description}
                                        onChange={(html) => setForm({ ...form, long_description: html })}
                                    />
                                </div>
                            </div>

                            {/* Media & Links */}
                            <div className="space-y-4">
                                <h3 className="text-xs font-bold uppercase tracking-wider text-primary border-b border-zinc-800 pb-1">3. Media & External Links</h3>

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
                                        <label className="text-xs font-semibold uppercase tracking-wider text-zinc-400">GitHub Repository URL</label>
                                        <input
                                            type="url"
                                            value={form.github_url}
                                            onChange={(e) => setForm({ ...form, github_url: e.target.value })}
                                            placeholder="https://github.com/user/repo"
                                            className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white focus:outline-none focus:border-primary"
                                        />
                                    </div>
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

                                <ImageUploader
                                    label="Project Thumbnail Image"
                                    value={form.image}
                                    onChange={(url) => setForm({ ...form, image: url })}
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
                                    <Button type="button" variant="outline" size="sm" onClick={() => setModalOpen(false)}>
                                        Cancel
                                    </Button>
                                    <Button type="submit" variant="neon" size="sm">
                                        Save Case Study
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
