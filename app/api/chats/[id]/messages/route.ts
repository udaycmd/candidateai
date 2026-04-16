import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
  _: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params

  const messages = await prisma.message.findMany({
    where: {
      chatId: id,
      chat: {
        userId: session.user.id,
      },
    },
    include: {
      sources: true,
    },
    orderBy: {
      createdAt: "asc",
    },
  })

  return NextResponse.json(messages)
}

export async function POST(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { id } = await params
  const { role, content, sources } = await req.json()

  const message = await prisma.message.create({
    data: {
      chatId: id,
      role,
      content,
      sources: {
        create: sources || [],
      },
    },
    include: {
      sources: true,
    },
  })

  return NextResponse.json(message)
}
