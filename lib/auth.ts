import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "@/lib/db"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
})
