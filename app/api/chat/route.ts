import type { ChatMessage } from "@/lib/types"
import { ErrorResponse } from "@/lib/errors"

export async function POST(req: Request) {
  const {
    messages: requestMessages,
    model: requestedModel,
    timezone,
    id,
    isTemporaryChat,
  } = await req.json()

  if (!Array.isArray(requestMessages) || requestMessages.length === 0) {
    return ErrorResponse({
      error: "bad_request",
      details: "messgaes array is empty",
    })
  }

  const incomingMessages = requestMessages as ChatMessage[]
  const userLastMessage = [...incomingMessages]
    .reverse()
    .find((m) => m.role === "user")

  if (!userLastMessage) {
    return ErrorResponse({
      error: "bad_request",
      details: "user's last message is required",
    })
  }
}
