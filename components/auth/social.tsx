"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { sileo } from "sileo"
import Image from "next/image"

export function Social() {
  const oauth = async (provider: "Google" | "Github") => {
    try {
      await authClient.signIn.social({
        provider: provider.toLowerCase(),
        callbackURL: "/",
      })
    } catch (err) {
      sileo.error({
        title: `${provider} sign in error`,
      })
      console.error(err instanceof Error ? err.message : { error: err })
    }
  }

  return (
    <div className="flex w-66 flex-col items-center gap-y-2">
      <Button
        size="sm"
        className="w-full cursor-pointer rounded"
        onClick={() => oauth("Google")}
      >
        <Image
          src="/google.svg"
          alt="google_login"
          width={25}
          height={25}
          priority
        />
        <span className="text-foreground">Google</span>
      </Button>
      <Button
        size="sm"
        className="w-full cursor-pointer rounded"
        onClick={() => oauth("Github")}
      >
        <Image
          src="/github.svg"
          alt="github_login"
          width={25}
          height={25}
          priority
        />
        <span className="text-foreground">Github</span>
      </Button>
    </div>
  )
}
