"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Reveal } from "@/components/animations/reveal"
import { GridTrail } from "@/components/animations/grid-trail"
import { SwipeButton } from "@/components/ui/swipe-button"
import { AnimatedCounter } from "@/components/ui/animated-counter"
import { FileText, Download, FileSpreadsheet } from "lucide-react"

export function Hero({ data }: { data: any }) {
    if (!data) return null

    const firstName = data.profile.name.split(" ")[0].toUpperCase();
    const stats = data.stats || [
        { label: 'Years Experience', value: '7+' },
        { label: 'Projects Completed', value: '50+' },
        { label: 'Clients Worked With', value: '30+' },
        { label: 'Years in Automation', value: '4+' }
    ];

    const resumeUrl = data.settings?.resume_url || data.profile?.resume_url || '#';
    const samplesUrl = data.settings?.automation_samples_url || '#';

    return (
        <section className="min-h-screen flex flex-col justify-between relative overflow-hidden bg-zinc-950 pt-16 pb-12">
            <GridTrail />

            {/* Main Hero Content */}
            <div className="container mx-auto px-4 md:px-6 relative z-50 flex flex-col justify-center pointer-events-none">
                <div className="grid md:grid-cols-12 gap-8 items-start w-full max-w-none mx-auto mb-8">

                    {/* Left Side: Badge & Title */}
                    <div className="md:col-span-6 lg:col-span-5 flex flex-col items-start space-y-6 mt-8 md:mt-12 pointer-events-auto">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-primary text-sm font-medium backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-primary animate-pulse" />
                                Available for Work & Automations
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tighter text-white leading-[1.1]">
                                {data.profile.role.split(",")[0]} <br />
                                based in <br />
                                <span className="text-zinc-500">{data.profile.location.split(",")[0]}</span>
                            </h1>
                        </Reveal>
                    </div>

                    {/* Middle Spacer */}
                    <div className="md:col-span-1 lg:col-span-2 hidden md:block" />

                    {/* Right Side: Bio & Action Buttons */}
                    <div className="md:col-span-5 lg:col-span-5 flex flex-col items-start md:items-end text-left md:text-right space-y-6 md:mt-24 pointer-events-auto">
                        <Reveal delay={0.2}>
                            <p className="text-zinc-400 text-base md:text-lg max-w-md leading-relaxed">
                                Hi, I'm {data.profile.name} – {data.profile.bio}
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <div className="flex flex-wrap items-center gap-3 justify-start md:justify-end">
                                <SwipeButton text="See my works" />

                                {resumeUrl !== '#' && (
                                    <Button variant="outline" size="lg" className="rounded-full border-zinc-800 text-zinc-300 hover:text-white gap-2" asChild>
                                        <a href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            <FileText className="h-4 w-4 text-primary" /> Resume
                                        </a>
                                    </Button>
                                )}

                                {samplesUrl !== '#' && (
                                    <Button variant="outline" size="lg" className="rounded-full border-zinc-800 text-zinc-300 hover:text-white gap-2" asChild>
                                        <a href={samplesUrl} target="_blank" rel="noopener noreferrer">
                                            <FileSpreadsheet className="h-4 w-4 text-primary" /> Samples
                                        </a>
                                    </Button>
                                )}
                            </div>
                        </Reveal>
                    </div>
                </div>

                {/* Animated Counter Stats Bar */}
                <Reveal delay={0.4} width="100%">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-8 pointer-events-auto max-w-5xl mx-auto">
                        {stats.map((stat: any, idx: number) => (
                            <AnimatedCounter key={idx} value={stat.value} label={stat.label} />
                        ))}
                    </div>
                </Reveal>
            </div>

            {/* Huge Background Text (Middle Layer) */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-10 leading-none opacity-15 md:opacity-30">
                <span className="text-[35vw] md:text-[22vw] font-bold text-white tracking-tighter select-none">
                    {firstName}
                </span>
            </div>
        </section>
    )
}
