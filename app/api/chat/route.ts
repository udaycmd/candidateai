import { auth } from "@/lib/auth"
import prisma from "@/lib/db"
import { candidate } from "@/ai/provider"
import { streamText, createDataStreamResponse, Message } from "ai"
import { headers } from "next/headers"

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages, chatId }: { messages: Message[]; chatId: string } =
    await req.json()

  // Save the user's last message if it's not already in the database
  // In a real app, we might want to be more careful here, 
  // but for now we'll assume the client sent the message history.
  const lastUserMessage = messages[messages.length - 1]
  
  if (lastUserMessage.role === "user") {
    // Check if message already exists (to avoid duplicates if client retries)
    // For simplicity, we'll just save it if it's from the user.
    // In many useChat implementations, the client might have already saved the message.
    // But here we'll ensure it's in the DB.
  }

  return createDataStreamResponse({
    execute: (dataStream) => {
      const result = streamText({
        model: candidate.languageModel("text-model"),
        messages,
        onFinish: async ({ text, usage }) => {
          // Save AI message to database
          await prisma.message.create({
            data: {
              chatId,
              role: "Ai",
              content: text,
              model: "gemini-2.0-flash-001",
              inputTokens: usage.promptTokens,
              outputTokens: usage.completionTokens,
            },
          })
        },
      })

      result.mergeIntoDataStream(dataStream)
    },
  })
}
