"use client"

import { Reveal } from "@/components/animations/reveal"
import { motion } from "framer-motion"
import {
    SiAdobecreativecloud,
    SiFigma,
    SiReact,
    SiNextdotjs,
    SiNodedotjs,
    SiTailwindcss,
    SiTypescript,
    SiNotion,
    SiSlack,
    SiSupabase,
    SiPostgresql,
    SiZapier,
    SiGit,
    SiGithub,
    SiDocker,
    SiPostman,
    SiVite,
    SiVercel,
    SiPython,
    SiOpenai,
    SiMongodb,
    SiRedis
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
    { name: "Tailwind CSS", icon: SiTailwindcss },
    { name: "Supabase", icon: SiSupabase },
    { name: "PostgreSQL", icon: SiPostgresql },
    { name: "Zapier", icon: SiZapier },
    { name: "MongoDB", icon: SiMongodb },
    { name: "Redis", icon: SiRedis },
    { name: "Docker", icon: SiDocker },
    { name: "Git", icon: SiGit },
    { name: "GitHub", icon: SiGithub },
    { name: "Postman", icon: SiPostman },
    { name: "Vite", icon: SiVite },
    { name: "Vercel", icon: SiVercel },
    { name: "Python", icon: SiPython },
    { name: "OpenAI", icon: SiOpenai },
    { name: "Notion", icon: SiNotion },
    { name: "Slack", icon: SiSlack },
];

// Duplicate list for infinite seamless looping
const marqueeList = [...apps, ...apps];

export function AppsUsed() {
    return (
        <section className="py-16 bg-zinc-950 border-t border-b border-white/5 relative overflow-hidden">
            <div className="container mx-auto px-4 md:px-6 text-center mb-8">
                <Reveal width="100%">
                    <p className="text-zinc-500 text-xs md:text-sm font-semibold tracking-widest uppercase">
                        Apps & Tech I Use Daily
                    </p>
                </Reveal>
            </div>

            {/* Carousel Container with Gradient Edge Fades */}
            <div className="relative w-full overflow-hidden py-4">
                {/* Left Edge Gradient Fade */}
                <div className="absolute top-0 left-0 bottom-0 w-20 md:w-48 bg-gradient-to-r from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />

                {/* Right Edge Gradient Fade */}
                <div className="absolute top-0 right-0 bottom-0 w-20 md:w-48 bg-gradient-to-l from-zinc-950 via-zinc-950/80 to-transparent z-20 pointer-events-none" />

                {/* Scrolling Marquee Carousel */}
                <motion.div
                    className="flex items-center gap-10 md:gap-16 w-max"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{
                        repeat: Infinity,
                        ease: "linear",
                        duration: 35
                    }}
                >
                    {marqueeList.map((app, index) => {
                        const Icon = app.icon;
                        return (
                            <div
                                key={index}
                                className="group flex flex-col items-center gap-2.5 cursor-pointer transition-transform hover:scale-110 duration-300 shrink-0"
                            >
                                <Icon className="h-9 w-9 md:h-11 md:w-11 text-zinc-500 group-hover:text-primary transition-colors duration-300" />
                                <span className="text-[11px] font-mono text-zinc-500 group-hover:text-white transition-colors duration-300 whitespace-nowrap">
                                    {app.name}
                                </span>
                            </div>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    )
}
