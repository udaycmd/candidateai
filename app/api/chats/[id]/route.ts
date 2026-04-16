import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { headers } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(
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

  const chat = await prisma.chat.findUnique({
    where: {
      id,
      userId: session.user.id,
    },
    include: {
      messages: {
        include: {
          sources: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  })

  if (!chat) {
    return new NextResponse("Not Found", { status: 404 })
  }

  return NextResponse.json(chat)
}

export async function PATCH(
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
  const { title } = await req.json()

  const chat = await prisma.chat.update({
    where: {
      id,
      userId: session.user.id,
    },
    data: {
      title,
    },
  })

  return NextResponse.json(chat)
}

export async function DELETE(
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

  await prisma.chat.delete({
    where: {
      id,
      userId: session.user.id,
    },
  })

  return new NextResponse(null, { status: 204 })
}
