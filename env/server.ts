import { createEnv } from "@t3-oss/env-nextjs"
import { z } from "zod"

export const serverEnv = createEnv({
  server: {
    DATABASE_URL: z.url().min(1),
    NODE_ENV: z.enum(["development", "production"]),
    GITHUB_OAUTH_CLIENT_ID: z.string().min(1),
    GITHUB_OAUTH_CLIENT_SECRET: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_ID: z.string().min(1),
    GOOGLE_OAUTH_CLIENT_SECRET: z.string().min(1),
    GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
    UPSTASH_REDIS_REST_URL: z.string().min(1),
    UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  },

  experimental__runtimeEnv: process.env,
})
