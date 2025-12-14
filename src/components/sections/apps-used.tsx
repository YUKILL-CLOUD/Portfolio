"use client"
import { Reveal } from "@/components/animations/reveal"
import {
    SiAdobecreativecloud,
    SiFigma,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTailwindcss,
    SiTypescript,
    SiNotion,
    SiSlack
} from "react-icons/si";
import { VscCode } from "react-icons/vsc";

const apps = [
    { name: "Adobe CC", icon: SiAdobecreativecloud },
    { name: "Figma", icon: SiFigma },
    { name: "VS Code", icon: VscCode },
    { name: "React", icon: SiReact },
    { name: "Next.js", icon: SiNextdotjs },
    { name: "Node.js", icon: SiNodedotjs },
    { name: "TypeScript", icon: SiTypescript },
    { name: "Tailwind", icon: SiTailwindcss },
    { name: "Notion", icon: SiNotion },
    { name: "Slack", icon: SiSlack },
];

export function AppsUsed() {
    return (
        <section className="py-20 bg-zinc-950 border-t border-white/5">
            <div className="container mx-auto px-4 md:px-6 text-center">
                <Reveal width="100%">
                    <p className="text-zinc-500 text-sm font-medium tracking-widest uppercase mb-12">
                        Apps & Tech I Use Daily
                    </p>

                    <div className="flex flex-wrap justify-center items-center gap-12 md:gap-20 opacity-50 hover:opacity-100 transition-opacity duration-500">
                        {apps.map((app, index) => (
                            <div key={index} className="group flex flex-col items-center gap-3 transition-transform hover:scale-110 duration-300">
                                <app.icon className="h-10 w-10 md:h-12 md:w-12 text-zinc-400 group-hover:text-primary transition-colors duration-300" />
                                <span className="text-xs text-zinc-500 group-hover:text-white opacity-0 group-hover:opacity-100 transition-all duration-300 absolute -bottom-6">
                                    {app.name}
                                </span>
                            </div>
                        ))}
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
