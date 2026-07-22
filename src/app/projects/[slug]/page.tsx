import React from 'react';
import { getProjectBySlug, getProjects, getSettings } from '@/lib/content';
import { Navbar } from '@/components/ui/navbar';
import { Footer } from '@/components/ui/footer';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ExternalLink, Github, Sparkles, CheckCircle2, Layers, Cpu, Award, BookOpen, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { notFound } from 'next/navigation';

export const revalidate = 0;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const project = await getProjectBySlug(slug);
    if (!project) return { title: 'Project Not Found' };
    return {
        title: `${project.title} | Case Study`,
        description: project.description
    };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const [project, allProjects, settings] = await Promise.all([
        getProjectBySlug(slug),
        getProjects(),
        getSettings()
    ]);

    if (!project) {
        notFound();
    }

    const relatedProjects = allProjects.filter((p: any) => p.id !== project.id).slice(0, 3);

    return (
        <main className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-primary selection:text-black">
            <Navbar />

            {/* Case Study Hero Header */}
            <section className="pt-32 pb-16 bg-gradient-to-b from-zinc-900/80 via-zinc-950 to-zinc-950 border-b border-zinc-900 relative overflow-hidden">
                <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

                <div className="container mx-auto px-4 md:px-6 relative z-10 max-w-5xl space-y-6">
                    <Link
                        href="/#projects"
                        className="inline-flex items-center gap-2 text-xs font-semibold text-zinc-400 hover:text-primary transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" /> Back to Selected Works
                    </Link>

                    <div className="space-y-3">
                        <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary/10 text-primary border border-primary/20 uppercase tracking-wider">
                            {project.category}
                        </span>
                        <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight">
                            {project.title}
                        </h1>
                        <p className="text-zinc-400 text-lg md:text-xl max-w-3xl leading-relaxed">
                            {project.description}
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-zinc-800/60">
                        <div className="flex flex-wrap gap-2">
                            {project.technologies?.map((tech: string) => (
                                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-900 text-zinc-300 text-xs font-mono border border-zinc-800">
                                    {tech}
                                </span>
                            ))}
                        </div>

                        <div className="flex items-center gap-3">
                            {project.link && (
                                <Button variant="neon" size="sm" asChild>
                                    <a href={project.link} target="_blank" rel="noopener noreferrer">
                                        Live Demo <ExternalLink className="ml-1.5 h-4 w-4" />
                                    </a>
                                </Button>
                            )}
                            {project.github_url && (
                                <Button variant="outline" size="sm" className="rounded-lg border-zinc-800 text-zinc-300 hover:text-white" asChild>
                                    <a href={project.github_url} target="_blank" rel="noopener noreferrer">
                                        <Github className="mr-1.5 h-4 w-4" /> Source Code
                                    </a>
                                </Button>
                            )}
                        </div>
                    </div>
                </div>
            </section>

            {/* Main Featured Image Banner */}
            <section className="py-12 container mx-auto px-4 md:px-6 max-w-5xl">
                <div className="rounded-3xl overflow-hidden border border-zinc-800 bg-zinc-900 shadow-2xl h-80 md:h-[480px] relative">
                    <img src={project.image || '/zbudget.png'} alt={project.title} className="w-full h-full object-cover" />
                </div>
            </section>

            {/* Content Sections (Only renders populated content) */}
            <section className="pb-24 container mx-auto px-4 md:px-6 max-w-4xl space-y-16">

                {/* Problem & Solution Grid */}
                {(project.problem || project.solution) && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {project.problem && (
                            <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-red-400" /> The Problem
                                </h2>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    {project.problem}
                                </p>
                            </div>
                        )}

                        {project.solution && (
                            <div className="p-6 md:p-8 rounded-2xl bg-zinc-900/60 border border-zinc-800/80 space-y-3">
                                <h2 className="text-xl font-bold text-white flex items-center gap-2">
                                    <span className="h-2 w-2 rounded-full bg-emerald-400" /> The Solution
                                </h2>
                                <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                    {project.solution}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Key Features List */}
                {project.key_features && project.key_features.length > 0 && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Sparkles className="h-5 w-5 text-primary" /> Key Features & Capabilities
                        </h2>
                        <div className="grid sm:grid-cols-2 gap-4">
                            {project.key_features.map((feature: string, idx: number) => (
                                <div key={idx} className="p-4 rounded-xl bg-zinc-900/40 border border-zinc-800/60 flex items-start gap-3">
                                    <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                                    <span className="text-zinc-300 text-sm leading-relaxed">{feature}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Architecture Section */}
                {(project.architecture || project.architecture_image) && (
                    <div className="space-y-6">
                        <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                            <Cpu className="h-5 w-5 text-primary" /> System Architecture & Flow
                        </h2>
                        {project.architecture && (
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                {project.architecture}
                            </p>
                        )}
                        {project.architecture_image && (
                            <div className="rounded-2xl border border-zinc-800 overflow-hidden bg-zinc-900 p-2">
                                <img src={project.architecture_image} alt="Architecture Diagram" className="w-full h-auto rounded-xl" />
                            </div>
                        )}
                    </div>
                )}

                {/* Engineering Challenges & Lessons Learned */}
                {(project.engineering_challenges || project.lessons_learned) && (
                    <div className="grid md:grid-cols-2 gap-8">
                        {project.engineering_challenges && (
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <Layers className="h-5 w-5 text-primary" /> Technical Challenges
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {project.engineering_challenges}
                                </p>
                            </div>
                        )}

                        {project.lessons_learned && (
                            <div className="space-y-3">
                                <h3 className="text-xl font-bold text-white flex items-center gap-2">
                                    <BookOpen className="h-5 w-5 text-primary" /> Lessons Learned
                                </h3>
                                <p className="text-zinc-400 text-sm leading-relaxed">
                                    {project.lessons_learned}
                                </p>
                            </div>
                        )}
                    </div>
                )}

                {/* Results & Metrics */}
                {project.results && (
                    <div className="p-6 md:p-8 rounded-2xl bg-primary/10 border border-primary/20 space-y-3">
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Award className="h-5 w-5 text-primary" /> Results & Business Impact
                        </h2>
                        <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                            {project.results}
                        </p>
                    </div>
                )}

                {/* Rich Long Description / Case Study Body */}
                {project.longDescription && (
                    <div className="space-y-4 pt-6 border-t border-zinc-800">
                        <h2 className="text-2xl font-bold text-white">In-Depth Overview</h2>
                        {project.longDescription.includes('<') ? (
                            <div
                                className="text-zinc-300 space-y-4 leading-relaxed [&>p]:leading-relaxed [&>strong]:text-white [&>strong]:font-semibold [&>h1]:text-2xl [&>h1]:font-bold [&>h1]:text-white [&>h2]:text-xl [&>h2]:font-semibold [&>h2]:text-white [&>ul]:list-disc [&>ul]:pl-5 [&>ol]:list-decimal [&>ol]:pl-5"
                                dangerouslySetInnerHTML={{ __html: project.longDescription }}
                            />
                        ) : (
                            <p className="text-zinc-400 leading-relaxed">{project.longDescription}</p>
                        )}
                    </div>
                )}

                {/* Related Projects Footer */}
                {relatedProjects.length > 0 && (
                    <div className="pt-12 border-t border-zinc-800 space-y-6">
                        <h2 className="text-2xl font-bold text-white">More Projects</h2>
                        <div className="grid sm:grid-cols-3 gap-4">
                            {relatedProjects.map((rel: any) => (
                                <Link
                                    key={rel.id}
                                    href={`/projects/${rel.slug || rel.id}`}
                                    className="group p-4 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-primary/50 transition-all space-y-2"
                                >
                                    <h3 className="text-sm font-semibold text-white group-hover:text-primary transition-colors flex items-center justify-between">
                                        {rel.title} <ChevronRight className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                                    </h3>
                                    <p className="text-xs text-zinc-500 line-clamp-2">{rel.description}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </section>

            <Footer />
        </main>
    );
}
