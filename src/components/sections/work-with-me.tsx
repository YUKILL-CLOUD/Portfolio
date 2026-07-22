'use client';

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";

export function WorkWithMe({ settings }: { settings?: any }) {
    const title = settings?.work_with_me_title || "Let's build systems that save time, increase revenue, and scale your business.";
    const subtitle = settings?.work_with_me_subtitle || "Available for full-stack web applications, Kajabi & GoHighLevel sales funnels, and CRM automation architecture.";
    const ctaLabel = settings?.work_with_me_cta_label || "Start a Project";

    return (
        <section className="py-16 bg-zinc-950 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Reveal width="100%">
                    <div className="relative rounded-3xl bg-gradient-to-r from-zinc-900/90 via-zinc-900/60 to-zinc-900/90 border border-zinc-800/80 p-8 md:p-14 overflow-hidden shadow-2xl backdrop-blur-xl flex flex-col md:flex-row items-center justify-between gap-8">
                        {/* Glow background accent */}
                        <div className="absolute top-1/2 -left-20 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />
                        <div className="absolute top-1/2 -right-20 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-[100px] pointer-events-none" />

                        <div className="space-y-4 max-w-2xl text-left">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-semibold uppercase tracking-wider">
                                <Sparkles className="h-3.5 w-3.5" /> High-Impact Collaboration
                            </div>
                            <h2 className="text-2xl md:text-4xl font-bold text-white leading-tight">
                                {title}
                            </h2>
                            <p className="text-zinc-400 text-sm md:text-base leading-relaxed">
                                {subtitle}
                            </p>
                        </div>

                        <div className="shrink-0">
                            <Button size="lg" variant="neon" className="rounded-full px-8 py-6 text-base font-semibold shadow-lg shadow-primary/20" asChild>
                                <Link href="#contact">
                                    {ctaLabel} <ArrowRight className="ml-2 h-5 w-5" />
                                </Link>
                            </Button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
