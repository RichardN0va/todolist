import { prisma } from "@/app/lib/db";
import { NextResponse } from "next/server";

export async function PATCH(req: Request, { params }: { params: { id: string } }) {
    const body = await req.json()
    const task = await prisma.task.update({
        where: { id: params.id },
        data: body
    })
    return NextResponse.json(task)
}

export async function DELETE(_: Request, { params }: { params: { id: string } }) {
    const { id } = await params
    await prisma.task.delete({
        where: { id }
    })
    return NextResponse.json({ message: 'Deleted' }, { status: 200 })
}