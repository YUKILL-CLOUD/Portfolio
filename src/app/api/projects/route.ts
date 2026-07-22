import { NextResponse } from 'next/server';
import { getProjects } from '@/lib/content';
import { saveProjectAction } from '@/app/admin/actions/projects';

export async function GET() {
    const projects = await getProjects();
    return NextResponse.json(projects);
}

export async function POST(request: Request) {
    try {
        const body = await request.json();
        const res = await saveProjectAction(body);
        return NextResponse.json(res);
    } catch (err: any) {
        return NextResponse.json({ success: false, message: err.message }, { status: 400 });
    }
}
