import { Button } from "@/components/ui/button"
import { Github, Linkedin, Mail, Facebook, Instagram, Briefcase } from "lucide-react"
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
                        <Button variant="outline" size="lg" className="rounded-full gap-2 border-zinc-800 text-zinc-300 hover:text-white" asChild>
                            <Link href="https://www.facebook.com/Paul.Brtl" target="_blank" rel="noopener noreferrer"><Facebook className="h-4 w-4" /> Facebook</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full gap-2 border-zinc-800 text-zinc-300 hover:text-white" asChild>
                            <Link href="https://www.instagram.com/jst__pol/" target="_blank" rel="noopener noreferrer"><Instagram className="h-4 w-4" /> Instagram</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full gap-2 border-zinc-800 text-zinc-300 hover:text-white" asChild>
                            <Link href="https://www.linkedin.com/in/paul-bartolo-782b13299/" target="_blank" rel="noopener noreferrer"><Linkedin className="h-4 w-4" /> LinkedIn</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full gap-2 border-zinc-800 text-zinc-300 hover:text-white" asChild>
                            <Link href="https://github.com/YUKILL-CLOUD" target="_blank" rel="noopener noreferrer"><Github className="h-4 w-4" /> GitHub</Link>
                        </Button>
                        <Button variant="outline" size="lg" className="rounded-full gap-2 border-zinc-800 text-zinc-300 hover:text-white" asChild>
                            <Link href="https://www.upwork.com/freelancers/~01d03d565130197ee3" target="_blank" rel="noopener noreferrer"><Briefcase className="h-4 w-4" /> Upwork</Link>
                        </Button>
                        <Button variant="neon" size="lg" className="rounded-full gap-2" asChild>
                            <a href="mailto:bartolopaul11@gmail.com"><Mail className="h-4 w-4" /> Email Me</a>
                        </Button>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}
