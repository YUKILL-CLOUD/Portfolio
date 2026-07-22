'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getSupabaseClient } from '@/lib/supabase';
import { Lock, Mail, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const supabase = getSupabaseClient();
        if (supabase) {
            const { error: authError } = await supabase.auth.signInWithPassword({
                email,
                password
            });
            if (authError) {
                setError(authError.message);
                setLoading(false);
                return;
            }
        }

        // Set session cookie for local admin access fallback
        document.cookie = `admin_session=authenticated; path=/; max-age=86400`;
        router.push('/admin');
    }

    return (
        <div className="min-h-screen bg-zinc-950 text-white flex flex-col justify-center items-center p-4 relative overflow-hidden selection:bg-primary selection:text-black">
            {/* Background ambient lighting */}
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-[140px] pointer-events-none" />

            <div className="w-full max-w-md bg-zinc-900/80 backdrop-blur-xl border border-zinc-800 p-8 rounded-2xl shadow-2xl relative z-10 space-y-6">
                <div className="text-center space-y-2">
                    <div className="inline-flex items-center justify-center p-3 rounded-2xl bg-primary/10 text-primary border border-primary/20 mb-2">
                        <ShieldCheck className="h-8 w-8" />
                    </div>
                    <h1 className="text-2xl font-bold tracking-tight">Admin Portal</h1>
                    <p className="text-sm text-zinc-400">Sign in to manage your portfolio content</p>
                </div>

                {error && (
                    <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg text-xs text-red-400 text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-400">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="admin@example.com"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-1">
                        <label className="text-xs font-medium text-zinc-400">Passcode / Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="••••••••"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-primary transition-colors"
                            />
                        </div>
                    </div>

                    <Button type="submit" variant="neon" size="lg" className="w-full rounded-lg font-semibold mt-2" disabled={loading}>
                        {loading ? 'Authenticating...' : (
                            <span className="flex items-center justify-center gap-2">
                                Sign In <ArrowRight className="h-4 w-4" />
                            </span>
                        )}
                    </Button>
                </form>

                <div className="text-center pt-2">
                    <a href="/" className="text-xs text-zinc-500 hover:text-primary transition-colors">
                        ← Back to Public Portfolio
                    </a>
                </div>
            </div>
        </div>
    );
}
