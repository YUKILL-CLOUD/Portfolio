import { Card } from "@/components/ui/card"
import { Reveal } from "@/components/animations/reveal"

export function Experience({ data }: { data: any }) {
    if (!data) return null;

    return (
        <section id="experience" className="py-24 bg-zinc-950/50">
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center">
                <Reveal>
                    <span className="text-primary text-sm font-medium tracking-widest uppercase block text-center">Career</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-12 text-center">Professional Journey</h2>
                </Reveal>

                <div className="relative border-l border-zinc-800 ml-0 md:mx-auto max-w-2xl space-y-12 text-left">
                    {data.experience.map((exp: any, index: number) => (
                        <Reveal key={exp.id} delay={index * 0.1}>
                            <div className="relative pl-8 md:pl-12">
                                <span className="absolute -left-[5px] top-2 h-2.5 w-2.5 rounded-full bg-primary ring-4 ring-zinc-950" />
                                <div className="flex flex-col md:flex-row md:items-baseline md:justify-between gap-1 mb-2">
                                    <h3 className="text-2xl font-bold">{exp.company}</h3>
                                    <span className="text-zinc-500 font-mono text-sm">{exp.period}</span>
                                </div>
                                <p className="text-xl text-zinc-300 mb-2">{exp.role}</p>
                                <p className="text-zinc-400 max-w-2xl">{exp.description}</p>
                            </div>
                        </Reveal>
                    ))}
                </div>
            </div>
        </section>
    )
}
