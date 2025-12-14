import { Button } from "@/components/ui/button"
import { Github, Twitter, Linkedin, Mail } from "lucide-react"
import Link from "next/link"
import { Reveal } from "@/components/animations/reveal"

export function Contact() {
    return (
        <section id="contact" className="py-24 bg-zinc-950">
            <div className="container mx-auto px-4 md:px-6 flex flex-col items-center text-center">
                <Reveal>
                    <span className="text-primary text-sm font-medium tracking-widest uppercase">Get in touch</span>
                    <h2 className="text-3xl md:text-5xl font-bold mt-2 mb-8">I'm all over the internet</h2>

                    <div className="flex flex-wrap justify-center gap-4">
                        <Button variant="outline" size="lg" className="rounded-full gap-2" asChild>
                            <Link href="https://twitter.com"><Twitter className="h-4 w-4" /> Twitter</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full gap-2" asChild>
                            <Link href="https://github.com"><Github className="h-4 w-4" /> GitHub</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full gap-2" asChild>
                            <Link href="https://linkedin.com"><Linkedin className="h-4 w-4" /> LinkedIn</Link>
                        </Button>
                        <Button variant="neon" size="lg" className="rounded-full gap-2" asChild>
                            <Link href="mailto:hello@example.com"><Mail className="h-4 w-4" /> Email Me</Link>
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
