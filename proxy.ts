import { NextRequest, NextResponse } from "next/server"
import { headers } from "next/headers"
import { publicRoutes, authRoutes } from "@/lib/routes"
import { auth } from "@/lib/auth"

export async function proxy(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: await headers(),
  })

  const isSignedIn = !!session

  if (authRoutes.includes(request.nextUrl.pathname)) {
    if (isSignedIn) {
      return NextResponse.redirect(new URL("/", request.nextUrl))
    }

    return NextResponse.next()
  }

  if (!isSignedIn && !publicRoutes.includes(request.nextUrl.pathname)) {
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
