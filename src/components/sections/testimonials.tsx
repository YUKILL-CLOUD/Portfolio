"use client"
import { Reveal } from "@/components/animations/reveal"
import { Quote } from "lucide-react"

export function Testimonials({ data }: { data: any }) {
    if (!data?.testimonials) return null;

    return (
        <section id="testimonials" className="py-24 bg-zinc-950 relative">
            <div className="container mx-auto px-4 md:px-6">
                <Reveal width="100%">
                    <div className="flex flex-col items-center text-center mb-16">
                        <span className="text-primary text-sm font-medium tracking-widest uppercase">Testimonials</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Client Stories</h2>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-3 gap-8">
                    {data.testimonials.map((item: any, index: number) => (
                        <Reveal key={index} delay={index * 0.1}>
                            <div className="relative p-8 rounded-2xl bg-gradient-to-br from-zinc-900 to-zinc-950 border border-zinc-800 h-full flex flex-col">
                                <Quote className="h-8 w-8 text-primary/20 mb-6" />
                                <p className="text-zinc-300 text-lg mb-8 flex-grow leading-relaxed">
                                    "{item.content}"
                                </p>
                                <div className="flex items-center gap-4 mt-auto">
                                    <div className="h-10 w-10 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500 uppercase border border-zinc-700">
                                        {item.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-sm">{item.name}</h4>
                                        <p className="text-zinc-500 text-xs">{item.role}</p>
                                    </div>
                                </div>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
