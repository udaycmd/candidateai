import { serverEnv } from "@/env/server"
import type { ChatMessage } from "@/lib/types"
import { ErrorResponse } from "@/lib/errors"
import { getOptimalAuthenticatedUser } from "@/lib/db-queries"
import { getClientIdentifier, ratelimiter } from "@/lib/rate-limiter"

export async function POST(req: Request) {
  const isDev = serverEnv.NODE_ENV === "development"
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

  const user = await getOptimalAuthenticatedUser()
  if (!user && !isDev) {
    const clientId = getClientIdentifier(req)
    const { success, limit, reset } = await ratelimiter.limit(clientId)

    if (!success) {
      const resetDate = new Date(reset)
      return ErrorResponse({
        error: "rate_limit",
        details: `You've reached the limit of ${limit} searches per day for unauthenticated users. Sign in for more searches or wait until ${resetDate.toLocaleString()}.`,
      })
    }
  }
}
