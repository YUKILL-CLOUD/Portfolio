import { NextResponse } from 'next/server';

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const { passcode } = body;
        const validPasscode = process.env.ADMIN_PASSCODE || 'admin123';

        if (passcode === validPasscode) {
            const response = NextResponse.json({ success: true, message: 'Authenticated successfully' });
            response.cookies.set('admin_auth', 'true', {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: 'strict',
                maxAge: 60 * 60 * 24 * 7,
                path: '/'
            });
            return response;
        } else {
            return NextResponse.json({ success: false, message: 'Invalid admin passcode' }, { status: 401 });
        }
    } catch {
        return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }
}