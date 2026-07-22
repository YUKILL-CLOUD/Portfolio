import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const path = request.nextUrl.pathname;

    if (path.startsWith('/admin') && path !== '/admin/login') {
        const adminSession = request.cookies.get('admin_session')?.value;
        const supabaseAuth = request.cookies.get('sb-access-token')?.value || request.cookies.get('supabase-auth-token')?.value;

        if (!adminSession && !supabaseAuth) {
            return NextResponse.redirect(new URL('/admin/login', request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ['/admin/:path*']
};
