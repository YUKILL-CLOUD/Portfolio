"use client"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, ExternalLink, Github, Sparkles, X, ChevronRight, BookOpen } from "lucide-react"
import Link from "next/link"

export function Projects({ data }: { data: any }) {
    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [selectedCategory, setSelectedCategory] = useState<string>("All");

    if (!data?.projects || data.projects.length === 0) return null;

    const rawProjects = data.projects;
    const categories = ["All", ...Array.from(new Set(rawProjects.map((p: any) => p.category))) as string[]];

    const filteredProjects = selectedCategory === "All"
        ? rawProjects
        : rawProjects.filter((p: any) => p.category === selectedCategory);

    // Identify Featured Project
    const featuredProject = filteredProjects.find((p: any) => p.featured) || filteredProjects[0];
    const remainingProjects = filteredProjects.filter((p: any) => p.id !== featuredProject?.id);

    return (
        <section id="projects" className="py-24 bg-zinc-950 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-1/3 left-0 w-96 h-96 bg-primary/5 rounded-full blur-[120px] pointer-events-none" />

            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <div className="flex flex-col items-center text-center mb-12">
                    <span className="text-primary text-xs font-semibold tracking-widest uppercase">Portfolio & Case Studies</span>
                    <h2 className="text-3xl md:text-5xl font-bold tracking-tighter mt-2 mb-4 text-white">Selected Works</h2>
                    <p className="text-zinc-400 max-w-xl text-sm md:text-base">
                        Explore full-stack web applications, marketing automations, and engineering case studies.
                    </p>

                    {/* Category Filter Pills */}
                    {categories.length > 2 && (
                        <div className="flex flex-wrap justify-center gap-2 mt-6">
                            {categories.map((cat: string) => (
                                <button
                                    key={cat}
                                    onClick={() => setSelectedCategory(cat)}
                                    className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all ${selectedCategory === cat ? "bg-primary text-black shadow-lg shadow-primary/20" : "bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* 1. Featured Project Hero Banner */}
                {featuredProject && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        className="mb-12 group rounded-3xl bg-zinc-900/60 border border-zinc-800 hover:border-primary/50 overflow-hidden shadow-2xl backdrop-blur-md transition-all duration-500"
                    >
                        <div className="grid md:grid-cols-12 gap-0 items-center">
                            {/* Image side */}
                            <div
                                className="md:col-span-7 h-64 md:h-96 relative overflow-hidden bg-zinc-950 cursor-pointer"
                                onClick={() => setSelectedProject(featuredProject)}
                            >
                                <img
                                    src={featuredProject.image || '/zbudget.png'}
                                    alt={featuredProject.title}
                                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                                />
                                <div className="absolute top-4 left-4 z-10">
                                    <span className="px-3 py-1 rounded-full text-xs font-bold bg-primary text-black flex items-center gap-1 shadow-lg">
                                        <Sparkles className="h-3 w-3" /> Featured Project
                                    </span>
                                </div>
                            </div>

                            {/* Info side */}
                            <div className="md:col-span-5 p-6 md:p-10 flex flex-col justify-between h-full space-y-6">
                                <div className="space-y-3">
                                    <span className="text-xs font-semibold text-primary uppercase tracking-wider">
                                        {featuredProject.category}
                                    </span>
                                    <h3
                                        className="text-2xl md:text-4xl font-bold text-white group-hover:text-primary transition-colors cursor-pointer"
                                        onClick={() => setSelectedProject(featuredProject)}
                                    >
                                        {featuredProject.title}
                                    </h3>
                                    <p className="text-zinc-400 text-sm md:text-base leading-relaxed line-clamp-3">
                                        {featuredProject.description}
                                    </p>
                                </div>

                                <div className="space-y-4">
                                    <div className="flex flex-wrap gap-2">
                                        {featuredProject.technologies?.slice(0, 4).map((tech: string) => (
                                            <span key={tech} className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                                                {tech}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center gap-3 pt-2">
                                        <Button variant="neon" size="sm" asChild>
                                            <Link href={`/projects/${featuredProject.slug || featuredProject.id}`}>
                                                <BookOpen className="h-4 w-4 mr-1.5" /> Read Case Study
                                            </Link>
                                        </Button>
                                        {featuredProject.link && (
                                            <Button variant="outline" size="sm" className="rounded-lg border-zinc-800 text-zinc-300 hover:text-white" asChild>
                                                <a href={featuredProject.link} target="_blank" rel="noopener noreferrer">
                                                    Live Demo <ArrowUpRight className="ml-1 h-3.5 w-3.5 text-primary" />
                                                </a>
                                            </Button>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* 2. Remaining Projects Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {remainingProjects.map((project: any, index: number) => (
                        <motion.div
                            key={project.id}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.4, delay: index * 0.1 }}
                            onClick={() => setSelectedProject(project)}
                            className="group cursor-pointer rounded-2xl bg-zinc-900/40 border border-zinc-800/80 hover:border-primary/50 overflow-hidden backdrop-blur-md flex flex-col justify-between transition-all duration-300 hover:-translate-y-1"
                        >
                            <div>
                                <div className="h-48 relative overflow-hidden bg-zinc-950">
                                    <img
                                        src={project.image || '/zbudget.png'}
                                        alt={project.title}
                                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                                    />
                                    <div className="absolute top-3 left-3">
                                        <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-zinc-900/90 text-zinc-300 border border-zinc-800 backdrop-blur-md">
                                            {project.category}
                                        </span>
                                    </div>
                                </div>

                                <div className="p-5 space-y-2">
                                    <h3 className="text-xl font-bold text-white group-hover:text-primary transition-colors flex items-center justify-between">
                                        {project.title}
                                        <ArrowUpRight className="h-4 w-4 text-zinc-500 group-hover:text-primary transition-colors" />
                                    </h3>
                                    <p className="text-zinc-400 text-xs line-clamp-2 leading-relaxed">
                                        {project.description}
                                    </p>
                                </div>
                            </div>

                            <div className="px-5 pb-5 pt-2 flex flex-wrap gap-1.5 border-t border-zinc-800/40 mt-3">
                                {project.technologies?.slice(0, 3).map((tech: string) => (
                                    <span key={tech} className="px-2 py-0.5 rounded bg-zinc-800/60 text-zinc-400 text-[10px] font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>

            {/* Quick Preview Modal (20-30 Second Summary + Link to Case Study) */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md overflow-y-auto">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl p-6 md:p-8 space-y-6 relative"
                        >
                            <button
                                onClick={() => setSelectedProject(null)}
                                className="absolute top-4 right-4 p-2 rounded-full bg-zinc-800/80 text-zinc-400 hover:text-white transition-colors"
                            >
                                <X className="h-5 w-5" />
                            </button>

                            <div className="h-44 rounded-2xl overflow-hidden bg-zinc-950">
                                <img src={selectedProject.image || '/zbudget.png'} alt="" className="w-full h-full object-cover" />
                            </div>

                            <div className="space-y-3">
                                <span className="text-xs font-bold uppercase tracking-wider text-primary">{selectedProject.category}</span>
                                <h3 className="text-2xl font-bold text-white">{selectedProject.title}</h3>
                                <p className="text-zinc-300 text-sm leading-relaxed">{selectedProject.description}</p>
                            </div>

                            <div className="flex flex-wrap gap-2">
                                {selectedProject.technologies?.map((tech: string) => (
                                    <span key={tech} className="px-2.5 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-mono">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-zinc-800">
                                <Button variant="neon" className="w-full sm:w-auto font-semibold" asChild>
                                    <Link href={`/projects/${selectedProject.slug || selectedProject.id}`}>
                                        Read Full Case Study <ChevronRight className="ml-1 h-4 w-4" />
                                    </Link>
                                </Button>

                                <div className="flex items-center gap-2 w-full sm:w-auto">
                                    {selectedProject.link && (
                                        <Button variant="outline" size="sm" className="w-full sm:w-auto rounded-lg border-zinc-800 text-zinc-300 hover:text-white" asChild>
                                            <a href={selectedProject.link} target="_blank" rel="noopener noreferrer">
                                                Live Demo <ExternalLink className="ml-1 h-3.5 w-3.5 text-primary" />
                                            </a>
                                        </Button>
                                    )}
                                    {selectedProject.github_url && (
                                        <Button variant="ghost" size="sm" className="text-zinc-400 hover:text-white" asChild>
                                            <a href={selectedProject.github_url} target="_blank" rel="noopener noreferrer">
                                                <Github className="h-4 w-4" />
                                            </a>
                                        </Button>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    );
}
