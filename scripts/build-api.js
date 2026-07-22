const fs = require('fs');
const path = require('path');

function writeFile(dir, filename, content) {
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, filename), content, 'utf8');
    console.log('Successfully wrote', path.join(dir, filename));
}

// 1. Admin Verify Route
const verifyContent = import { NextResponse } from 'next/server';

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
                maxAge: 60 * 60 * 24 * 7, // 1 week
                path: '/'
            });
            return response;
        } else {
            return NextResponse.json({ success: false, message: 'Invalid admin passcode' }, { status: 401 });
        }
    } catch (error) {
        return NextResponse.json({ success: false, message: 'Invalid request' }, { status: 400 });
    }
}
;
writeFile('src/app/api/admin/verify', 'route.ts', verifyContent);

// 2. Projects API Route (GET, POST, DELETE)
const projectsContent = import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/portfolio.json');

async function isAuthorized(request: Request) {
    const cookieStore = await cookies();
    const authCookie = cookieStore.get('admin_auth')?.value;
    const authHeader = request.headers.get('x-admin-passcode');
    const validPasscode = process.env.ADMIN_PASSCODE || 'admin123';

    return authCookie === 'true' || authHeader === validPasscode;
}

export async function GET() {
    try {
        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);
        return NextResponse.json(data.projects || []);
    } catch (error) {
        return NextResponse.json({ error: 'Failed to read projects' }, { status: 500 });
    }
}

export async function POST(request: Request) {
    if (!(await isAuthorized(request))) {
        return NextResponse.json({ error: 'Unauthorized: Invalid admin credentials' }, { status: 401 });
    }

    try {
        const body = await request.json();
        const { title, category, description, longDescription, image, link, technologies } = body;

        if (!title || !category || !description) {
            return NextResponse.json({ error: 'Missing required fields: title, category, and description are required.' }, { status: 400 });
        }

        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);

        const techArray = Array.isArray(technologies)
            ? technologies
            : typeof technologies === 'string'
                ? technologies.split(',').map((t: string) => t.trim()).filter(Boolean)
                : ['Next.js'];

        const newProject = {
            id: Date.now().toString(),
            title,
            category,
            image: image || '/zbudget.png',
            link: link || '#',
            description,
            longDescription: longDescription || description,
            technologies: techArray
        };

        data.projects = data.projects || [];
        data.projects.unshift(newProject);

        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ success: true, project: newProject }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to add project' }, { status: 500 });
    }
}

export async function DELETE(request: Request) {
    if (!(await isAuthorized(request))) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id');

        if (!id) {
            return NextResponse.json({ error: 'Project ID is required' }, { status: 400 });
        }

        const fileContent = await fs.readFile(dataFilePath, 'utf-8');
        const data = JSON.parse(fileContent);

        data.projects = (data.projects || []).filter((p: any) => p.id !== id);

        await fs.writeFile(dataFilePath, JSON.stringify(data, null, 2), 'utf-8');

        return NextResponse.json({ success: true, message: 'Project deleted successfully' });
    } catch (error) {
        return NextResponse.json({ error: 'Failed to delete project' }, { status: 500 });
    }
}
;
writeFile('src/app/api/projects', 'route.ts', projectsContent);
