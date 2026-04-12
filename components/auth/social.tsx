"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { sileo } from "sileo"
import { useState } from "react"
import Image from "next/image"

export function Social() {
  const [isPending, setIsPending] = useState<boolean>(false)

  const oauth = async (provider: "Google" | "Github") => {
    try {
      setIsPending(true)
      await authClient.signIn.social({
        provider: provider.toLowerCase(),
        callbackURL: "/",
      })
    } catch (err) {
      sileo.error({
        title: `${provider} sign in error`,
      })
      console.error(err instanceof Error ? err.message : { error: err })
    } finally {
      setIsPending(false)
    }
  }

  return (
    <div className="flex w-66 flex-col items-center gap-y-2">
      <Button
        size="sm"
        disabled={isPending}
        className="w-full cursor-pointer rounded-2xl"
        onClick={() => oauth("Google")}
      >
        <Image
          src="/google.svg"
          alt="google_login"
          className="dark:invert"
          width={25}
          height={25}
          priority
        />
        <span className="text-foreground">Google</span>
      </Button>
      <Button
        size="sm"
        disabled={isPending}
        className="w-full cursor-pointer rounded-2xl"
        onClick={() => oauth("Github")}
      >
        <Image
          src="/github.svg"
          alt="github_login"
          className="dark:invert"
          width={25}
          height={25}
          priority
        />
        <span className="text-foreground">Github</span>
      </Button>
    </div>
  )
}
