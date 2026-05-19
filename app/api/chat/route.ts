import { type UIMessage, streamText, convertToModelMessages } from "ai"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { candidateModels } from "@/ai/provider"
import prisma from "@/lib/db"

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const { id, messages }: { id: string; messages: UIMessage[] } = await req.json()
  const lastMessage = messages[messages.length - 1]

  if (!lastMessage || !lastMessage.content) {
    return new Response("No message content", { status: 400 })
  }

  // Handle constraints for anonymous users
  if (!session) {
    const ip = (await headers()).get("x-forwarded-for") || "unknown"
    // Simple constraint: limit anonymous messages (e.g., 20 messages per day per IP)
    // This is a basic implementation and could be improved with a proper rate limiter
    const anonymousMessageCount = await prisma.message.count({
      where: {
        chat: {
          userId: null,
          // We don't have IP in Chat model yet, so this is a placeholder for the concept
          // For now, let's just count all anonymous messages in the last 24h
        },
        createdAt: {
          gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      },
    })

    if (anonymousMessageCount >= 50) {
      return new Response("Daily limit reached for anonymous users. Please sign in to continue.", {
        status: 429,
      })
    }
  }

  const modelMessages = await convertToModelMessages(messages)

  // Ensure chat exists or create a new one
  let chat = await prisma.chat.findUnique({
    where: { id },
    include: { messages: true },
  })

  if (!chat) {
    chat = await prisma.chat.create({
      data: {
        id,
        userId: session?.user?.id || null,
        title: lastMessage.content.slice(0, 50),
      },
      include: { messages: true },
    })
  }

  // Save the user message
  await prisma.message.create({
    data: {
      chatId: chat.id,
      role: "User",
      content: lastMessage.content,
    },
  })

  const response = streamText({
    model: candidateModels.languageModel("thinking"),
    messages: modelMessages,
    onFinish: async ({ text, usage }) => {
      // Save the AI response
      await prisma.message.create({
        data: {
          chatId: chat!.id,
          role: "Ai",
          content: text,
          model: "thinking",
          inputTokens: usage.promptTokens,
          outputTokens: usage.completionTokens,
        },
      })
    },
  })

  return response.toUIMessageStreamResponse()
}
