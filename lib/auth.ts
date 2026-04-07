import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import prisma from "@/lib/db"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
})
