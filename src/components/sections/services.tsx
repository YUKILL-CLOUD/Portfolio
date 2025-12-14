"use client"
import { Reveal } from "@/components/animations/reveal"
import { Palette, Code, Zap, TrendingUp } from "lucide-react"

const iconMap: any = {
    Palette: Palette,
    Code: Code,
    Zap: Zap,
    TrendingUp: TrendingUp,
}

export function Services({ data }: { data: any }) {
    if (!data?.services) return null;

    return (
        <section id="services" className="py-24 bg-zinc-950/50 relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-primary/5 rounded-full blur-[100px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Reveal width="100%">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-primary text-sm font-medium tracking-widest uppercase">Expertise</span>
                        <h2 className="text-2xl md:text-4xl font-bold mt-2">What I Do</h2>
                    </div>
                </Reveal>

                <div className="flex flex-col gap-4">
                    {data.services.map((service: any, index: number) => {
                        const Icon = iconMap[service.icon] || Code;
                        return (
                            <Reveal key={index} delay={index * 0.1}>
                                <div className="group border-b border-zinc-800 pb-8 pt-4 transition-all duration-500 hover:border-primary/50 relative overflow-hidden cursor-default">
                                    <div className="flex items-center justify-between relative z-10">
                                        <div className="flex items-center gap-6 md:gap-12">
                                            <span className="text-zinc-600 font-mono text-sm md:text-base group-hover:text-primary transition-colors">0{index + 1}</span>
                                            <h3 className="text-2xl md:text-4xl lg:text-5xl font-bold text-zinc-300 group-hover:text-white transition-colors duration-300">
                                                {service.title}
                                            </h3>
                                        </div>
                                        <div className="opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-500 ease-out hidden md:flex h-12 w-12 rounded-full border border-primary/30 items-center justify-center text-primary">
                                            <Icon className="h-6 w-6" />
                                        </div>
                                    </div>

                                    <div className="mt-4 md:ml-20 lg:ml-24 max-w-xl h-0 opacity-0 group-hover:h-auto group-hover:opacity-100 overflow-hidden transition-all duration-500 ease-in-out">
                                        <p className="text-zinc-400 text-lg pt-2 pb-4">
                                            {service.description}
                                        </p>
                                    </div>

                                    {/* Hover gradient background */}
                                    <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
