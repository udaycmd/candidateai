"use server"

import { google } from "@ai-sdk/google"
import { customProvider } from "ai"

export const candidate = customProvider({
  languageModels: {
    "text-model": google("gemini-2.0-flash-001"),
  },
})
