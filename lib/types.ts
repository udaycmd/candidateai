import { UIMessage } from "ai"
import { z } from "zod"

const messageMetadataSchema = z.object({
  createdAt: z.string(),
  model: z.string(),
  completionTime: z.number().nullable(),
  inputTokens: z.number().nullable(),
  outputTokens: z.number().nullable(),
  totalTokens: z.number().nullable(),
})

export type ChatMessage = UIMessage<z.infer<typeof messageMetadataSchema>>

export type AuthenticatedUser = {
  userId: string
  email: string
}
