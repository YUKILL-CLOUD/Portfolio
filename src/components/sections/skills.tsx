"use client"

import { motion } from "framer-motion"
import portfolioData from "@/data/portfolio.json"

export function Skills() {
    const { skills } = portfolioData

    return (
        <section id="skills" className="py-20 bg-zinc-950 border-t border-white/5 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[20%] right-[10%] w-96 h-96 bg-primary/5 rounded-full blur-[100px]" />
                <div className="absolute bottom-[20%] left-[10%] w-72 h-72 bg-purple-500/5 rounded-full blur-[100px]" />
            </div>

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="flex flex-col items-center text-center mb-16"
                >
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mb-4 bg-gradient-to-r from-white to-white/50 bg-clip-text text-transparent">
                        Technical Proficiency
                    </h2>
                    <p className="text-zinc-400 max-w-2xl">
                        A curated stack of tools and technologies I use to bring digital products to life.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.name}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="group p-6 rounded-2xl bg-zinc-900/50 border border-white/5 hover:border-primary/50 transition-all duration-300 hover:shadow-[0_0_30px_-10px_rgba(var(--primary-rgb),0.3)]"
                        >
                            <div className="flex justify-between items-end mb-4">
                                <h3 className="text-xl font-semibold text-zinc-100 group-hover:text-primary transition-colors">
                                    {skill.name}
                                </h3>
                                <span className="text-sm font-mono text-zinc-500 group-hover:text-primary/80 transition-colors">
                                    {skill.level}%
                                </span>
                            </div>

                            <div className="h-2 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <motion.div
                                    initial={{ width: 0 }}
                                    whileInView={{ width: `${skill.level}%` }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 1, delay: 0.5 + (index * 0.1), ease: "easeOut" }}
                                    className="h-full bg-gradient-to-r from-primary to-purple-500 rounded-full"
                                />
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    )
}
