'use client';

import { Reveal } from "@/components/animations/reveal";
import { Button } from "@/components/ui/button";
import { Github, ArrowUpRight, Code2 } from "lucide-react";

export function GithubActivity({ username = 'YUKILL-CLOUD' }: { username?: string }) {
    return (
        <section className="py-20 bg-zinc-950/60 relative overflow-hidden border-t border-b border-zinc-900">
            <div className="container mx-auto px-4 md:px-6 relative z-10">
                <Reveal width="100%">
                    <div className="flex flex-col items-center text-center mb-12">
                        <span className="text-primary text-xs font-semibold tracking-widest uppercase flex items-center gap-2">
                            <Code2 className="h-4 w-4" /> Open Source & Activity
                        </span>
                        <h2 className="text-2xl md:text-4xl font-bold text-white mt-2">GitHub Contributions</h2>
                        <p className="text-zinc-400 text-sm md:text-base mt-2 max-w-lg">
                            Active developer building open-source tools, native Windows apps, and full-stack solutions.
                        </p>
                    </div>
                </Reveal>

                <Reveal width="100%">
                    <div className="max-w-4xl mx-auto bg-zinc-900/60 border border-zinc-800 rounded-2xl p-6 md:p-8 backdrop-blur-md flex flex-col items-center space-y-6">
                        <div className="w-full overflow-x-auto flex justify-center py-2">
                            {/* Native GitHub contribution graph image */}
                            <img
                                src={`https://ghchart.rshah.org/39D353/${username}`}
                                alt={`${username}'s GitHub Contributions`}
                                className="min-w-[600px] w-full max-w-3xl opacity-90 hover:opacity-100 transition-opacity filter invert-[0.1]"
                            />
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-4 w-full pt-4 border-t border-zinc-800/80 text-xs text-zinc-400">
                            <div className="flex items-center gap-2">
                                <Github className="h-4 w-4 text-white" />
                                <span className="font-semibold text-white">@{username}</span>
                            </div>
                            <Button variant="outline" size="sm" className="rounded-full border-zinc-800 text-zinc-300 hover:text-white" asChild>
                                <a href={`https://github.com/${username}`} target="_blank" rel="noopener noreferrer">
                                    View GitHub Profile <ArrowUpRight className="ml-1.5 h-3.5 w-3.5 text-primary" />
                                </a>
                            </Button>
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    );
}
