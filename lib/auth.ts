import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },

  database: prismaAdapter(null, {
    provider: "postgresql",
  }),
})
