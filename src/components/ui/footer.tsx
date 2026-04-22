import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-zinc-950 py-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} Paul Bernard Bartolo. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link href="#hero" className="text-zinc-500 hover:text-primary transition-colors text-sm">Home</Link>
                    <Link href="#about" className="text-zinc-500 hover:text-primary transition-colors text-sm">About</Link>
                    <Link href="#projects" className="text-zinc-500 hover:text-primary transition-colors text-sm">Projects</Link>
                    <Link href="#contact" className="text-zinc-500 hover:text-primary transition-colors text-sm">Contact</Link>
                </div>
            </div>
        </footer>
    )
}
