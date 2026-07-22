"use client"

import { Reveal } from "@/components/animations/reveal"
import { Button } from "@/components/ui/button"
import { Briefcase, Calendar, ChevronRight, FileText, Sparkles } from "lucide-react"

export function Experience({ data }: { data: any }) {
    if (!data?.experience || data.experience.length === 0) return null;

    const resumeUrl = data.settings?.resume_url || data.profile?.resume_url || '#';

    return (
        <section id="experience" className="py-24 bg-zinc-950 relative overflow-hidden border-t border-white/5">
            {/* Background ambient lighting */}
            <div className="absolute top-1/2 right-0 w-96 h-96 bg-primary/5 rounded-full blur-[140px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="grid lg:grid-cols-12 gap-12 items-start">

                    {/* Left Column: Career Summary & Highlights */}
                    <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                                <Briefcase className="h-3.5 w-3.5" /> Career History
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h2 className="text-3xl md:text-5xl font-bold tracking-tight text-white leading-tight">
                                Professional <br className="hidden md:block" />
                                <span className="text-zinc-500">Journey</span>
                            </h2>
                        </Reveal>

                        <Reveal delay={0.2}>
                            <p className="text-zinc-400 text-base md:text-lg leading-relaxed">
                                Over 7+ years of experience architecting full-stack web applications, leading technical workflows, and executing end-to-end sales funnel automations.
                            </p>
                        </Reveal>

                        {/* Quick Highlights Badge Box */}
                        <Reveal delay={0.3}>
                            <div className="grid grid-cols-2 gap-3 pt-2">
                                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md">
                                    <span className="text-2xl font-bold text-white font-mono">7+</span>
                                    <p className="text-xs text-zinc-500 mt-1 uppercase font-semibold">Years Exp.</p>
                                </div>
                                <div className="p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800/80 backdrop-blur-md">
                                    <span className="text-2xl font-bold text-white font-mono">4+</span>
                                    <p className="text-xs text-zinc-500 mt-1 uppercase font-semibold">Roles Held</p>
                                </div>
                            </div>
                        </Reveal>

                        {resumeUrl !== '#' && (
                            <Reveal delay={0.4}>
                                <div className="pt-2">
                                    <Button variant="outline" size="lg" className="rounded-full border-zinc-800 text-zinc-300 hover:text-white gap-2" asChild>
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <FileText className="h-4 w-4 text-primary" /> Download Full Resume
                                        </a>
                                    </Button>
                                </div>
                            </Reveal>
                        )}
                    </div>

                    {/* Right Column: Glassmorphic Timeline Cards */}
                    <div className="lg:col-span-7 space-y-6">
                        {data.experience.map((exp: any, index: number) => (
                            <Reveal key={exp.id || index} delay={index * 0.1} width="100%">
                                <div className="group relative p-6 md:p-8 rounded-3xl bg-zinc-900/40 border border-zinc-800/80 hover:border-primary/50 backdrop-blur-md transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 space-y-4">
                                    {/* Top Header */}
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-zinc-800/60">
                                        <div>
                                            <span className="text-xs font-semibold text-primary uppercase tracking-wider flex items-center gap-1.5 mb-1">
                                                <Sparkles className="h-3 w-3" /> {exp.role}
                                            </span>
                                            <h3 className="text-xl md:text-2xl font-bold text-white group-hover:text-primary transition-colors">
                                                {exp.company}
                                            </h3>
                                        </div>

                                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-800/60 border border-zinc-700/60 text-zinc-400 font-mono text-xs shrink-0 self-start sm:self-auto">
                                            <Calendar className="h-3.5 w-3.5 text-primary" />
                                            {exp.period}
                                        </div>
                                    </div>

                                    {/* Description */}
                                    <p className="text-zinc-300 text-sm md:text-base leading-relaxed">
                                        {exp.description}
                                    </p>

                                    {/* Technologies Badges */}
                                    {exp.technologies && exp.technologies.length > 0 && (
                                        <div className="flex flex-wrap gap-1.5 pt-2">
                                            {exp.technologies.map((tech: string) => (
                                                <span key={tech} className="px-2.5 py-0.5 rounded-full bg-zinc-950 text-zinc-400 text-xs font-mono border border-zinc-800">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </Reveal>
                        ))}
                    </div>

                </div>
            </div>
        </section>
    )
}
