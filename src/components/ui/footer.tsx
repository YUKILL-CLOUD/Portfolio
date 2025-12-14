import Link from "next/link"

export function Footer() {
    return (
        <footer className="w-full border-t border-white/5 bg-zinc-950 py-12">
            <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row justify-between items-center gap-6">
                <p className="text-zinc-500 text-sm">
                    © {new Date().getFullYear()} Paul Bernard Bartolo. All rights reserved.
                </p>
                <div className="flex gap-6">
                    <Link href="#" className="text-zinc-500 hover:text-primary transition-colors">Twitter</Link>
                    <Link href="#" className="text-zinc-500 hover:text-primary transition-colors">GitHub</Link>
                    <Link href="#" className="text-zinc-500 hover:text-primary transition-colors">LinkedIn</Link>
                </div>
            </div>
        </footer>
    )
}
