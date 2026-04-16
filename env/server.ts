import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url().min(1),
    NODE_ENV: z.string().min(1),
    GITHUB_OAUTH_CLIENT_ID: z.string().min(1),
    GITHUB_OAUTH_CLIENT_SECRET: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
  },

  experimental__runtimeEnv: process.env,
})
