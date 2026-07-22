import Link from 'next/link';
import { getContent } from '@/lib/content';
import { FolderKanban, GraduationCap, MessageSquareQuote, Plus, Sparkles, ArrowUpRight, Clock, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const revalidate = 0;

export default async function AdminDashboardPage() {
    const data = await getContent();

    const totalProjects = data.projects?.length || 0;
    const totalSkills = data.skills?.length || 0;
    const totalTestimonials = data.testimonials?.length || 0;

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-zinc-800 pb-6">
                <div>
                    <h1 className="text-3xl font-bold text-white">Dashboard Overview</h1>
                    <p className="text-sm text-zinc-400 mt-1">Manage your portfolio content, projects, and site settings</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button variant="neon" size="sm" asChild>
                        <Link href="/admin/projects">
                            <Plus className="h-4 w-4 mr-1" /> Add Project
                        </Link>
                    </Button>
                </div>
            </div>

            {/* Metric Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Total Projects</span>
                        <div className="text-3xl font-bold text-white mt-1">{totalProjects}</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                        <FolderKanban className="h-6 w-6" />
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Skills Listed</span>
                        <div className="text-3xl font-bold text-white mt-1">{totalSkills}</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                        <GraduationCap className="h-6 w-6" />
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Testimonials</span>
                        <div className="text-3xl font-bold text-white mt-1">{totalTestimonials}</div>
                    </div>
                    <div className="p-3 bg-primary/10 rounded-xl text-primary border border-primary/20">
                        <MessageSquareQuote className="h-6 w-6" />
                    </div>
                </div>

                <div className="p-5 rounded-xl bg-zinc-900/60 border border-zinc-800 flex items-center justify-between">
                    <div>
                        <span className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Database Status</span>
                        <div className="text-xs font-semibold text-emerald-400 mt-1 flex items-center gap-1">
                            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" /> Active & Synced
                        </div>
                    </div>
                    <div className="p-3 bg-emerald-500/10 rounded-xl text-emerald-400 border border-emerald-500/20">
                        <Shield className="h-6 w-6" />
                    </div>
                </div>
            </div>

            {/* Quick Actions Grid */}
            <div className="space-y-4">
                <h2 className="text-lg font-semibold text-white">Quick Actions</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
                    <Link href="/admin/projects" className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800 rounded-xl flex items-center justify-between transition-colors group">
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Add New Project</span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    </Link>
                    <Link href="/admin/services" className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800 rounded-xl flex items-center justify-between transition-colors group">
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Edit Services</span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    </Link>
                    <Link href="/admin/experience" className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800 rounded-xl flex items-center justify-between transition-colors group">
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">Update Experience</span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    </Link>
                    <Link href="/admin/settings" className="p-4 bg-zinc-900/40 hover:bg-zinc-800/60 border border-zinc-800 rounded-xl flex items-center justify-between transition-colors group">
                        <span className="text-sm font-medium text-zinc-300 group-hover:text-white">SEO & Resume Settings</span>
                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                    </Link>
                </div>
            </div>

            {/* Recent Items Preview */}
            <div className="space-y-4 pt-4">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white">Current Projects</h2>
                    <Link href="/admin/projects" className="text-xs text-primary hover:underline">View All Projects →</Link>
                </div>
                <div className="divide-y divide-zinc-800/60 border border-zinc-800 bg-zinc-900/40 rounded-xl overflow-hidden">
                    {data.projects.slice(0, 5).map((project: any) => (
                        <div key={project.id} className="p-4 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                                <div className="h-10 w-10 rounded-lg bg-zinc-800 overflow-hidden flex items-center justify-center text-xs font-bold text-zinc-400">
                                    {project.image ? <img src={project.image} alt="" className="h-full w-full object-cover" /> : project.title.slice(0, 2)}
                                </div>
                                <div>
                                    <h3 className="text-sm font-semibold text-white">{project.title}</h3>
                                    <span className="text-xs text-zinc-500">{project.category}</span>
                                </div>
                            </div>
                            <span className="px-2.5 py-0.5 rounded-full text-[10px] font-semibold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                Published
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
