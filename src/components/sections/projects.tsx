"use client"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/animations/reveal"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"

export function Projects({ data }: { data: any }) {
    const [visibleProjects, setVisibleProjects] = useState(3);

    const [selectedProject, setSelectedProject] = useState<any>(null);
    const [currentSlide, setCurrentSlide] = useState(0);

    const openProject = (project: any) => {
        setSelectedProject(project);
        setCurrentSlide(0);
    };

    const nextSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedProject) return;
        const images = selectedProject.gallery || [selectedProject.image];
        setCurrentSlide((prev) => (prev + 1) % images.length);
    };

    const prevSlide = (e: React.MouseEvent) => {
        e.stopPropagation();
        if (!selectedProject) return;
        const images = selectedProject.gallery || [selectedProject.image];
        setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
    };

    if (!data) return null;

    return (
        <section id="projects" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4 md:px-6">
                <Reveal width="100%">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="text-primary text-sm font-medium tracking-widest uppercase">Portfolio</span>
                        <h2 className="text-3xl md:text-5xl font-bold mt-2">Selected Works</h2>
                    </div>
                </Reveal>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {data.projects.slice(0, visibleProjects).map((project: any, index: number) => (
                        <Reveal key={project.id} delay={index * 0.1}>
                            <div onClick={() => openProject(project)} className="cursor-pointer block h-full">
                                <Card className="h-full group overflow-hidden border-zinc-800 bg-zinc-900/40 hover:border-primary/50 transition-colors relative">
                                    <div className="aspect-video w-full bg-zinc-800 relative overflow-hidden">
                                        {/* Image */}
                                        <img
                                            src={project.image}
                                            alt={project.title}
                                            className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/90 via-zinc-950/20 to-transparent z-10" />

                                        <div className="p-6 md:p-8 absolute bottom-0 left-0 z-20 w-full flex flex-col justify-end">
                                            <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                                                <div className="mb-2">
                                                    <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] block">
                                                        {project.category}
                                                    </span>
                                                </div>
                                                <div className="flex justify-between items-end gap-4">
                                                    <div className="w-full">
                                                        <h3 className="text-xl md:text-2xl font-bold text-white leading-tight">{project.title}</h3>
                                                        <div className="grid grid-rows-[0fr] group-hover:grid-rows-[1fr] transition-[grid-template-rows] duration-500 ease-out">
                                                            <div className="overflow-hidden">
                                                                <p className="text-zinc-400 text-sm line-clamp-2 pt-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300 delay-100">
                                                                    {project.description || "A showcase of high-performance digital product design."}
                                                                </p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Button size="icon" variant="neon" className="rounded-full opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 shrink-0 mb-1 pointer-events-none group-hover:pointer-events-auto">
                                                        <ArrowUpRight className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Card>
                            </div>
                        </Reveal>
                    ))}
                </div>

                {data.projects.length > 3 && (
                    <div className="flex justify-center mt-12">
                        <Button
                            variant="outline"
                            size="lg"
                            className="border-zinc-800 text-zinc-400 hover:text-white hover:border-primary/50"
                            onClick={() => setVisibleProjects(prev => prev === 3 ? data.projects.length : 3)}
                        >
                            {visibleProjects === 3 ? "Show More Work" : "Show Less"}
                        </Button>
                    </div>
                )}
            </div>

            {/* Project Details Modal */}
            <AnimatePresence>
                {selectedProject && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 md:p-8">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setSelectedProject(null)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            className="relative w-full max-w-4xl bg-zinc-900 border border-zinc-800 rounded-3xl overflow-hidden shadow-2xl max-h-[90vh] overflow-y-auto"
                        >
                            <div className="relative h-64 md:h-96 w-full group">
                                <AnimatePresence mode="wait">
                                    <motion.img
                                        key={currentSlide}
                                        src={(selectedProject.gallery || [selectedProject.image])[currentSlide]}
                                        alt={selectedProject.title}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                        className="w-full h-full object-cover"
                                    />
                                </AnimatePresence>

                                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-60" />

                                <Button
                                    size="icon"
                                    variant="secondary"
                                    className="absolute top-4 right-4 rounded-full bg-black/50 hover:bg-black/70 text-white border-0 z-20"
                                    onClick={() => setSelectedProject(null)}
                                >
                                    <X className="h-5 w-5" />
                                </Button>

                                {/* Slideshow Navigation */}
                                {(selectedProject.gallery?.length > 1) && (
                                    <>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute left-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={prevSlide}
                                        >
                                            <ChevronLeft className="h-6 w-6" />
                                        </Button>
                                        <Button
                                            size="icon"
                                            variant="ghost"
                                            className="absolute right-4 top-1/2 -translate-y-1/2 rounded-full bg-black/30 hover:bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                                            onClick={nextSlide}
                                        >
                                            <ChevronRight className="h-6 w-6" />
                                        </Button>
                                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                                            {selectedProject.gallery.map((_: any, idx: number) => (
                                                <div
                                                    key={idx}
                                                    className={`h-1.5 rounded-full transition-all ${idx === currentSlide ? 'w-6 bg-white' : 'w-1.5 bg-white/50'}`}
                                                />
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            <div className="p-8 md:p-12">
                                <div className="flex flex-wrap gap-4 items-start justify-between mb-8">
                                    <div>
                                        <div className="mb-3">
                                            <span className="text-primary text-[10px] md:text-xs font-bold uppercase tracking-widest drop-shadow-[0_2px_8px_rgba(0,0,0,0.9)] block">
                                                {selectedProject.category}
                                            </span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{selectedProject.title}</h2>
                                        <div className="flex flex-wrap gap-2">
                                            {selectedProject.technologies?.map((tech: string) => (
                                                <span key={tech} className="px-3 py-1 rounded-full bg-zinc-800 text-zinc-300 text-xs font-medium border border-zinc-700">
                                                    {tech}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                    <Button size="lg" variant="neon" asChild>
                                        <Link href={selectedProject.link || "#"} target="_blank" rel="noopener noreferrer">
                                            View Project <ArrowUpRight className="ml-2 h-4 w-4" />
                                        </Link>
                                    </Button>
                                </div>

                                <div className="space-y-6 text-zinc-400 leading-relaxed md:text-lg">
                                    <p>{selectedProject.longDescription || selectedProject.description}</p>
                                    <p>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                                    </p>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </section>
    )
}
