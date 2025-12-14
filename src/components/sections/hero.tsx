"use client"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Reveal } from "@/components/animations/reveal"
import { GridTrail } from "@/components/animations/grid-trail"

export function Hero({ data }: { data: any }) {
    if (!data) return null

    const firstName = data.profile.name.split(" ")[0].toUpperCase();

    return (
        <section className="min-h-screen flex flex-col justify-center relative overflow-hidden bg-zinc-950 pt-0">
            <GridTrail />

            {/* Content Layer (Top Priority) */}
            <div className="container mx-auto px-4 md:px-6 relative z-50 flex flex-col justify-center pointer-events-none">
                <div className="grid md:grid-cols-12 gap-8 items-start w-full max-w-none mx-auto mb-12 md:mb-0">

                    {/* Left Side: Badge & Title */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start space-y-8 mt-12 md:mt-20 pointer-events-auto">
                        <Reveal>
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-zinc-900/80 border border-zinc-800 text-[var(--primary)] text-sm font-medium backdrop-blur-md">
                                <span className="h-2 w-2 rounded-full bg-[var(--primary)] animate-pulse" />
                                Available for Work
                            </div>
                        </Reveal>

                        <Reveal delay={0.1}>
                            <h1 className="text-4xl md:text-5xl lg:text-7xl font-bold tracking-tighter text-white leading-[1.1]">
                                {data.profile.role.split(",")[0]} <br />
                                based in <br />
                                <span className="text-zinc-500">{data.profile.location.split(",")[0]}</span>
                            </h1>
                        </Reveal>
                    </div>

                    {/* Middle Spacer */}
                    <div className="md:col-span-2 lg:col-span-4 hidden md:block" />

                    {/* Right Side: Bio & Button */}
                    <div className="md:col-span-5 lg:col-span-4 flex flex-col items-start md:items-end text-left md:text-right space-y-8 md:mt-40 pointer-events-auto">
                        <Reveal delay={0.2}>
                            <p className="text-zinc-400 text-lg md:text-xl max-w-sm leading-relaxed">
                                Hi, I'm {data.profile.name} – {data.profile.bio}
                            </p>
                        </Reveal>

                        <Reveal delay={0.3}>
                            <Button size="lg" className="h-16 pl-8 pr-2 rounded-full bg-primary text-primary-foreground hover:bg-primary/90 text-lg font-bold group shadow-[0_0_20px_-5px_var(--primary)] hover:shadow-[0_0_30px_-5px_var(--primary)] transition-all duration-300 flex items-center gap-4" asChild>
                                <Link href="#projects">
                                    See my works
                                    <span className="h-12 w-12 bg-white text-black rounded-full flex items-center justify-center group-hover:scale-110 transition-transform">
                                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                                            <line x1="5" y1="12" x2="19" y2="12"></line>
                                            <polyline points="12 5 19 12 12 19"></polyline>
                                        </svg>
                                    </span>
                                </Link>
                            </Button>
                        </Reveal>
                    </div>
                </div>
            </div>

            {/* Huge Background Text (Middle Layer) */}
            <div className="absolute -bottom-4 md:-bottom-8 left-1/2 -translate-x-1/2 w-full text-center pointer-events-none z-40 leading-none mix-blend-overlay">
                {/* Added mix-blend-overlay to make it look a bit more integrated/transparent if user wants opacity, else remove it if they want SOLID. User asked for solid overlapping image. */}
                <span className="text-[25vw] font-bold text-white tracking-tighter select-none">
                    {firstName}
                </span>
            </div>

            {/* Image Layer (Bottom Layer) */}
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 z-30 flex justify-center items-end w-full pointer-events-none">
                <Reveal delay={0.4} width="100%">
                    <div className="relative flex justify-center items-end">
                        {data.profile.avatar ? (
                            <img
                                src={data.profile.avatar}
                                alt={data.profile.name}
                                className="w-auto h-[85vh] max-w-none object-contain drop-shadow-2xl translate-y-12" // Increased height to match reference
                            />
                        ) : (
                            <div className="w-96 h-96 flex items-center justify-center text-9xl">👨‍💻</div>
                        )}
                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent opacity-50" />
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
