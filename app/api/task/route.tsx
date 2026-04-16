import { prisma } from "@/app/lib/db";
import { error } from "console";
import { NextResponse } from "next/server";

export async function GET() {
    const tasks = await prisma.task.findMany({
        orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(tasks)
}

export async function POST(req: Request) {
    const { title } = await req.json()

    if (!title) {
        return NextResponse.json({ error: 'Title is required' }, { status: 400 })
    }
    const task = await prisma.task.create({
        data: { title }
    })
    return NextResponse.json(task, { status: 201 })
}
