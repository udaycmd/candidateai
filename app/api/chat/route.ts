import type { UIMessage } from "ai"
import { headers } from "next/headers"
import { auth } from "@/lib/auth"
import { candidateModels } from "@/ai/provider"
import { streamText, convertToModelMessages } from "ai"

export async function POST(req: Request) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session) {
    return new Response("Unauthorized", { status: 401 })
  }

  const { messages }: { messages: UIMessage[] } = await req.json()
  const modelMessages = await convertToModelMessages(messages)

  const response = streamText({
    model: candidateModels.languageModel("thinking"),
    messages: modelMessages,
  })

  return response.toUIMessageStreamResponse()
}
