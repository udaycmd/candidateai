import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import prisma from "@/lib/db"

export async function GET() {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const chats = await prisma.chat.findMany({
    where: {
      userId: session.user.id,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  return NextResponse.json(chats)
}

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new NextResponse("Unauthorized", { status: 401 })
  }

  const { title } = await req.json()

  const chat = await prisma.chat.create({
    data: {
      userId: session.user.id,
      title: title || "New Chat",
    },
  })

  return NextResponse.json(chat)
}
