"use client"
import { useState } from "react"
import { Reveal } from "@/components/animations/reveal"
import { Palette, Code, Zap, TrendingUp } from "lucide-react"

const iconMap: any = {
    Palette: Palette,
    Code: Code,
    Zap: Zap,
    TrendingUp: TrendingUp,
}

export function Services({ data }: { data: any }) {
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

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
                        const isActive = activeIndex === index;

                        return (
                            <Reveal key={index} delay={index * 0.1} width="100%">
                                <div
                                    className={`group border-b border-zinc-800 pb-4 pt-4 transition-all duration-500 hover:border-primary/50 relative overflow-hidden cursor-pointer ${isActive ? 'border-primary/50' : ''}`}
                                    onClick={() => setActiveIndex(isActive ? null : index)}
                                >
                                    <div className="flex flex-col md:flex-row md:items-center justify-between relative z-10 py-6 md:py-8 gap-2 md:gap-8">
                                        <div className="flex items-center justify-between md:justify-start gap-6 md:gap-12 shrink-0 md:w-2/5">
                                            <div className="flex items-center gap-6 md:gap-12">
                                                <span className={`font-mono text-sm md:text-base transition-colors ${isActive ? 'text-primary' : 'text-zinc-600 group-hover:text-primary'}`}>
                                                    0{index + 1}
                                                </span>
                                                <h3 className={`text-2xl md:text-4xl lg:text-5xl font-bold transition-colors duration-300 ${isActive ? 'text-white' : 'text-zinc-300 group-hover:text-white'}`}>
                                                    {service.title}
                                                </h3>
                                            </div>
                                            {/* Mobile Icon */}
                                            <div className={`md:hidden transition-all duration-500 ease-out flex shrink-0 h-10 w-10 md:h-12 md:w-12 rounded-full border border-primary/30 items-center justify-center text-primary ${isActive ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-4'}`}>
                                                <Icon className="h-5 w-5 md:h-6 md:w-6" />
                                            </div>
                                        </div>

                                        <div className="flex items-center flex-1 gap-6 w-full">
                                            {/* Description Body */}
                                            <div
                                                className={`flex-1 overflow-hidden transition-all duration-500 ease-in-out ${isActive ? 'max-h-96 opacity-100 mt-2 md:mt-0' : 'max-h-0 opacity-0 md:group-hover:max-h-96 md:group-hover:opacity-100'}`}
                                            >
                                                <p className="text-zinc-400 text-base md:text-lg pl-11 md:pl-0 max-w-xl">
                                                    {service.description}
                                                </p>
                                            </div>

                                            {/* Desktop Icon */}
                                            <div className={`transition-all duration-500 ease-out hidden md:flex shrink-0 h-12 w-12 rounded-full border border-primary/30 items-center justify-center text-primary ml-auto ${isActive ? 'translate-x-0 opacity-100' : 'opacity-0 -translate-x-10 group-hover:translate-x-0 group-hover:opacity-100'}`}>
                                                <Icon className="h-6 w-6" />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Hover / Active gradient background */}
                                    <div className={`absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-transparent transition-opacity duration-500 pointer-events-none ${isActive ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
                                </div>
                            </Reveal>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
