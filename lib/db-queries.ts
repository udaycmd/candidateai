import { cacheLife } from "next/cache"
import { headers } from "next/headers"
import type { AuthenticatedUser } from "@/lib/types"
import { auth } from "@/lib/auth"

export async function getOptimalAuthenticatedUser(): Promise<AuthenticatedUser | null> {
  "use cache"
  cacheLife("minutes")

  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (!session?.user.id) {
    return null
  }

  return {
    userId: session.user.id,
    email: session.user.email,
  }
}
