import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { protectedRoutes, authRoutes } from "@/lib/routes"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (session) {
      return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    return NextResponse.next()
  }

  if (protectedRoutes.includes(request.nextUrl.pathname) && !session) {
    return NextResponse.redirect(new URL("/sign-in", request.nextUrl))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    // Skip Next.js internals and all static files, unless found in search params
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    // Always run for API routes
    "/(api|trpc)(.*)",
  ],
}
