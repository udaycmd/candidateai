"use server"

import { google } from "@ai-sdk/google"
import { customProvider } from "ai"

export const candidateModels = customProvider({
  languageModels: {
    thinking: google("gemma-4-31b-it"),
  },
})
