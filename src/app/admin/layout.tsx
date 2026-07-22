'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
    LayoutDashboard,
    User,
    FolderKanban,
    Wrench,
    GraduationCap,
    Briefcase,
    MessageSquareQuote,
    Layers,
    Share2,
    Settings,
    LogOut,
    ExternalLink,
    Menu,
    X,
    Sparkles
} from 'lucide-react';

const sidebarItems = [
    { name: 'Dashboard', href: '/admin', icon: LayoutDashboard },
    { name: 'Hero / Profile', href: '/admin/hero', icon: User },
    { name: 'Projects', href: '/admin/projects', icon: FolderKanban },
    { name: 'Services', href: '/admin/services', icon: Wrench },
    { name: 'Skills', href: '/admin/skills', icon: GraduationCap },
    { name: 'Experience', href: '/admin/experience', icon: Briefcase },
    { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareQuote },
    { name: 'Apps & Tools', href: '/admin/apps', icon: Layers },
    { name: 'Contact & Social', href: '/admin/contact', icon: Share2 },
    { name: 'Site Settings', href: '/admin/settings', icon: Settings }
];

export default function AdminLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const router = useRouter();
    const [sidebarOpen, setSidebarOpen] = useState(false);

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    function handleLogout() {
        document.cookie = 'admin_session=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT;';
        router.push('/admin/login');
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col md:flex-row selection:bg-primary selection:text-black">
            {/* Mobile Header */}
            <header className="md:hidden flex items-center justify-between p-4 bg-zinc-900 border-b border-zinc-800">
                <div className="flex items-center gap-2">
                    <Sparkles className="h-5 w-5 text-primary" />
                    <span className="font-bold text-sm tracking-wide">CMS Admin</span>
                </div>
                <button onClick={() => setSidebarOpen(!sidebarOpen)} className="p-2 text-zinc-400 hover:text-white">
                    {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                </button>
            </header>

            {/* Sidebar */}
            <aside className={`fixed md:sticky top-0 z-40 h-screen w-64 bg-zinc-900/95 backdrop-blur-xl border-r border-zinc-800 p-4 flex flex-col justify-between transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}`}>
                <div className="space-y-6">
                    {/* Brand */}
                    <div className="flex items-center justify-between px-3 pt-2">
                        <div className="flex items-center gap-2">
                            <div className="h-8 w-8 rounded-lg bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                                <Sparkles className="h-4 w-4" />
                            </div>
                            <div>
                                <h2 className="font-bold text-sm leading-none">Swift Sunspot</h2>
                                <span className="text-[10px] text-zinc-400 font-mono">CMS Admin Panel</span>
                            </div>
                        </div>
                    </div>

                    {/* Navigation Items */}
                    <nav className="space-y-1">
                        {sidebarItems.map((item) => {
                            const Icon = item.icon;
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    onClick={() => setSidebarOpen(false)}
                                    className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-xs font-medium transition-all ${isActive ? 'bg-primary text-black font-semibold shadow-md shadow-primary/20' : 'text-zinc-400 hover:text-white hover:bg-zinc-800/60'}`}
                                >
                                    <Icon className="h-4 w-4 shrink-0" />
                                    <span>{item.name}</span>
                                </Link>
                            );
                        })}
                    </nav>
                </div>

                {/* Footer Controls */}
                <div className="space-y-2 pt-4 border-t border-zinc-800">
                    <a
                        href="/"
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between px-3 py-2 rounded-lg text-xs text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                        <span className="flex items-center gap-2">
                            <ExternalLink className="h-4 w-4 text-primary" /> View Live Site
                        </span>
                    </a>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2 px-3 py-2 rounded-lg text-xs text-red-400 hover:bg-red-500/10 transition-colors"
                    >
                        <LogOut className="h-4 w-4" /> Sign Out
                    </button>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-6 md:p-10 max-w-6xl overflow-y-auto">
                {children}
            </main>
        </div>
    );
}
