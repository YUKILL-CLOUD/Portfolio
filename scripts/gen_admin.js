const fs = require('fs');

const tsx = " use client\;

import React, { useState, useEffect } from \react\;
import Link from \next/link\;
import { Lock, Plus, Trash2, ArrowLeft, CheckCircle, AlertCircle, ShieldCheck, FolderPlus } from \lucide-react\;

export default function AdminPage() {
 const [isAuthenticated, setIsAuthenticated] = useState(false);
 const [passcode, setPasscode] = useState(\\);
 const [loginError, setLoginError] = useState(\\);
 const [isLoading, setIsLoading] = useState(false);

 const [title, setTitle] = useState(\\);
 const [category, setCategory] = useState(\\);
 const [description, setDescription] = useState(\\);
 const [longDescription, setLongDescription] = useState(\\);
 const [image, setImage] = useState(\/zbudget.png\);
 const [link, setLink] = useState(\\);
 const [technologies, setTechnologies] = useState(\\);

 const [formSuccess, setFormSuccess] = useState(\\);
 const [formError, setFormError] = useState(\\);
 const [isSubmitting, setIsSubmitting] = useState(false);

 const [projects, setProjects] = useState<any[]>([]);

 const fetchProjects = async () => {
 try {
 const res = await fetch(\/api/projects\);
 if (res.ok) {
 const data = await res.json();
 setProjects(data);
 }
 } catch (err) {
 console.error(\Failed to load projects\, err);
 }
 };

 useEffect(() => {
 if (isAuthenticated) {
 fetchProjects();
 }
 }, [isAuthenticated]);

 const handleLogin = async (e: React.FormEvent) => {
 e.preventDefault();
 setLoginError(\\);
 setIsLoading(true);

 try {
 const res = await fetch(\/api/admin/verify\, {
 method: \POST\,
 headers: { \Content-Type\: \application/json\ },
 body: JSON.stringify({ passcode })
 });

 const data = await res.json();

 if (res.ok && data.success) {
 setIsAuthenticated(true);
 } else {
 setLoginError(data.message || \Invalid passcode\);
 }
 } catch {
 setLoginError(\Failed to authenticate\);
 } finally {
 setIsLoading(false);
 }
 };

 const handleAddProject = async (e: React.FormEvent) => {
 e.preventDefault();
 setFormSuccess(\\);
 setFormError(\\);

 if (!title || !category || !description) {
 setFormError(\Please fill out all required fields.\);
 return;
 }

 setIsSubmitting(true);

 try {
 const res = await fetch(\/api/projects\, {
 method: \POST\,
 headers: {
 \Content-Type\: \application/json\,
 \x-admin-passcode\: passcode
 },
 body: JSON.stringify({
 title,
 category,
 description,
 longDescription: longDescription || description,
 image: image || \/zbudget.png\,
 link: link || \#\,
 technologies: technologies ? technologies.split(",\).map(t => t.trim()) : [\Next.js\]
                })
            });

            const data = await res.json();

            if (res.ok && data.success) {
                setFormSuccess(\Project added successfully!\);
                setTitle(\\);
                setCategory(\\);
                setDescription(\\);
                setLongDescription(\\);
                setLink(\\);
                setTechnologies(\\);
                fetchProjects();
            } else {
                setFormError(data.error || \Failed to add project\);
            }
        } catch {
            setFormError(\An unexpected error occurred.\);
        } finally {
            setIsSubmitting(false);
        }
    };

    const handleDeleteProject = async (id: string, projTitle: string) => {
        if (!confirm(\Are you sure you want to delete this project?\)) return;

        try {
            const res = await fetch(\/api/projects?id=\ + id, {
                method: \DELETE\,
                headers: {
                    \x-admin-passcode\: passcode
                }
            });

            if (res.ok) {
                fetchProjects();
            } else {
                alert(\Failed to delete project\);
            }
        } catch {
            alert(\Error deleting project\);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className=\min-h-screen bg-zinc-950 text-zinc-100 flex items-center justify-center p-4\>
                <div className=\w-full max-w-md bg-zinc-900/80 border border-zinc-800 rounded-2xl p-8 shadow-2xl backdrop-blur-xl\>
                    <div className=\flex flex-col items-center text-center mb-8\>
                        <div className=\w-14 h-14 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary mb-4\>
                            <Lock className=\w-7 h-7\ />
                        </div>
                        <h1 className=\text-2xl font-bold\>Admin Portal Access</h1>
                        <p className=\text-sm text-zinc-400 mt-1\>Enter your admin passcode to manage portfolio projects.</p>
                    </div>

                    <form onSubmit={handleLogin} className=\space-y-5\>
                        <div>
                            <label className=\block text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-2\>
                                Admin Passcode
                            </label>
                            <input
                                type=\password\
                                value={passcode}
                                onChange={(e) => setPasscode(e.target.value)}
                                placeholder=\Enter admin passcode\
                                className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-4 py-3 text-white placeholder-zinc-600 focus:outline-none focus:border-primary transition\
                                required
                            />
                        </div>

                        {loginError && (
                            <div className=\flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm\>
                                <AlertCircle className=\w-4 h-4 shrink-0\ />
                                <span>{loginError}</span>
                            </div>
                        )}

                        <button
                            type=\submit\
                            disabled={isLoading}
                            className=\w-full bg-primary text-zinc-950 font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 disabled:opacity-50\
                        >
                            {isLoading ? \Authenticating...\ : \Unlock Portal\}
                        </button>
                    </form>

                    <div className=\mt-8 text-center border-t border-zinc-800/60 pt-6\>
                        <Link href=\/\ className=\inline-flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition\>
                            <ArrowLeft className=\w-3.5 h-3.5\ /> Back to Main Portfolio
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className=\min-h-screen bg-zinc-950 text-zinc-100 p-4 md:p-8\>
            <div className=\max-w-6xl mx-auto space-y-8\>
                <header className=\flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-zinc-800/80 pb-6\>
                    <div>
                        <div className=\flex items-center gap-2 text-xs font-bold text-primary tracking-widest uppercase mb-1\>
                            <ShieldCheck className=\w-4 h-4\ /> Admin Portal
                        </div>
                        <h1 className=\text-3xl font-bold\>Project Management</h1>
                    </div>
                    <div className=\flex items-center gap-3\>
                        <Link
                            href=\/\
                            className=\px-4 py-2 bg-zinc-900 border border-zinc-800 text-zinc-300 rounded-xl text-sm hover:text-white hover:border-zinc-700 transition flex items-center gap-2\
                        >
                            <ArrowLeft className=\w-4 h-4\ /> Back to Website
                        </Link>
                        <button
                            onClick={() => setIsAuthenticated(false)}
                            className=\px-4 py-2 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-sm hover:bg-red-500/20 transition\
                        >
                            Lock Access
                        </button>
                    </div>
                </header>

                <div className=\grid grid-cols-1 lg:grid-cols-12 gap-8\>
                    <div className=\lg:col-span-5 bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-6 shadow-xl backdrop-blur-xl h-fit\>
                        <div className=\flex items-center gap-2 font-bold text-lg mb-6 pb-4 border-b border-zinc-800/60\>
                            <FolderPlus className=\w-5 h-5 text-primary\ /> Add New Project
                        </div>

                        <form onSubmit={handleAddProject} className=\space-y-4\>
                            <div>
                                <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Project Title *</label>
                                <input
                                    type=\text\
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder=\e.g. E-Commerce Platform\
                                    className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                    required
                                />
                            </div>

                            <div>
                                <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Category *</label>
                                <input
                                    type=\text\
                                    value={category}
                                    onChange={(e) => setCategory(e.target.value)}
                                    placeholder=\e.g. Web App Marketing Automation\
                                    className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                    required
                                />
                            </div>

                            <div>
                                <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Short Description *</label>
                                <textarea
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                    rows={2}
                                    placeholder=\Brief overview shown on project card\
                                    className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                    required
                                />
                            </div>

                            <div>
                                <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Detailed Description</label>
                                <textarea
                                    value={longDescription}
                                    onChange={(e) => setLongDescription(e.target.value)}
                                    rows={3}
                                    placeholder=\Extended story and feature details\
                                    className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                />
                            </div>

                            <div>
                                <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Technologies (comma separated)</label>
                                <input
                                    type=\text\
                                    value={technologies}
                                    onChange={(e) => setTechnologies(e.target.value)}
                                    placeholder=\e.g. Next.js React Tailwind CSS\
                                    className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                />
                            </div>

                            <div className=\grid grid-cols-1 sm:grid-cols-2 gap-4\>
                                <div>
                                    <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Image URL / Path</label>
                                    <input
                                        type=\text\
                                        value={image}
                                        onChange={(e) => setImage(e.target.value)}
                                        placeholder=\/zbudget.png\
                                        className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                    />
                                </div>
                                <div>
                                    <label className=\block text-xs font-semibold text-zinc-400 mb-1\>Live Project Link</label>
                                    <input
                                        type=\text\
                                        value={link}
                                        onChange={(e) => setLink(e.target.value)}
                                        placeholder=\https://...\
                                        className=\w-full bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-sm text-white focus:outline-none focus:border-primary\
                                    />
                                </div>
                            </div>

                            {formError && (
                                <div className=\flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-400 rounded-xl text-xs\>
                                    <AlertCircle className=\w-4 h-4 shrink-0\ />
                                    <span>{formError}</span>
                                </div>
                            )}

                            {formSuccess && (
                                <div className=\flex items-center gap-2 p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 rounded-xl text-xs\>
                                    <CheckCircle className=\w-4 h-4 shrink-0\ />
                                    <span>{formSuccess}</span>
                                </div>
                            )}

                            <button
                                type=\submit\
                                disabled={isSubmitting}
                                className=\w-full bg-primary text-zinc-950 font-bold py-3 px-6 rounded-xl hover:bg-primary/90 transition duration-200 flex items-center justify-center gap-2 text-sm mt-2 disabled:opacity-50\
                            >
                                <Plus className=\w-4 h-4\ />
                                {isSubmitting ? \Adding Project...\ : \Add Project to Portfolio\}
                            </button>
                        </form>
                    </div>

                    <div className=\lg:col-span-7 space-y-4\>
                        <div className=\flex items-center justify-between mb-4\>
                            <h2 className=\text-xl font-bold\>Existing Projects ({projects.length})</h2>
                            <span className=\text-xs text-zinc-500\>Live portfolio items</span>
                        </div>

                        <div className=\space-y-3\>
                            {projects.map((proj) => (
                                <div
                                    key={proj.id}
                                    className=\bg-zinc-900/60 border border-zinc-800/80 rounded-2xl p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-zinc-700 transition\
                                >
                                    <div className=\space-y-1\>
                                        <div className=\flex items-center gap-2\>
                                            <span className=\text-[10px] uppercase font-bold text-primary tracking-wider px-2 py-0.5 bg-primary/10 rounded-md\>
                                                {proj.category}
                                            </span>
                                            <span className=\text-xs text-zinc-500\>ID: {proj.id}</span>
                                        </div>
                                        <h3 className=\font-bold text-white text-base\>{proj.title}</h3>
                                        <p className=\text-xs text-zinc-400 line-clamp-1 max-w-md\>{proj.description}</p>
                                        <div className=\flex flex-wrap gap-1.5 pt-1\>
                                            {proj.technologies?.map((tech: string) => (
                                                <span key={tech} className=\text-[10px] bg-zinc-950 px-2 py-0.5 rounded text-zinc-400 border border-zinc-800\>
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>

                                    <button
                                        onClick={() => handleDeleteProject(proj.id, proj.title)}
                                        className=\self-end sm:self-center px-3 py-1.5 bg-red-500/10 text-red-400 hover:bg-red-500/20 border border-red-500/20 rounded-xl text-xs transition flex items-center gap-1.5\
                                    >
                                        <Trash2 className=\w-3.5 h-3.5\ /> Delete
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
;

fs.mkdirSync('src/app/admin', { recursive: true });
fs.writeFileSync('src/app/admin/page.tsx', tsx, 'utf8');
console.log('Script wrote page.tsx cleanly!');
