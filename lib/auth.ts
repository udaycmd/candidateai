import { betterAuth } from "better-auth"
import { prismaAdapter } from "better-auth/adapters/prisma"
import { serverEnv } from "@/env/server"
import prisma from "@/lib/db"

export const auth = betterAuth({
  emailAndPassword: {
    enabled: false,
  },

  user: {
    deleteUser: {
      enabled: true,
    },
  },

  session: {
    cookieCache: {
      enabled: true,
      maxAge: 2 * 60,
    },
  },

  socialProviders: {
    github: {
      clientId: serverEnv.GITHUB_OAUTH_CLIENT_ID,
      clientSecret: serverEnv.GITHUB_OAUTH_CLIENT_SECRET,
    },
    google: {
      clientId: serverEnv.GOOGLE_OAUTH_CLIENT_ID,
      clientSecret: serverEnv.GOOGLE_OAUTH_CLIENT_SECRET,
    },
  },

  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
})
