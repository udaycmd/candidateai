"use client"

import { GoogleButton } from "@/components/auth/google-button"
import { GithubButton } from "@/components/auth/github-button"

export function OAuthProviders() {
  return (
    <div className="flex flex-col gap-3">
      <GoogleButton />
      <GithubButton />
    </div>
  )
}
