"use client"

import { authClient } from "@/lib/auth-client"
import { Button } from "@/components/ui/button"
import { sileo } from "sileo"
import { Loader2 } from "lucide-react"
import { useState, Fragment } from "react"
import Image from "next/image"

const providers = ["Google", "Github"] as const
type Provider = (typeof providers)[number]

export function Social() {
  const [isPending, setIsPending] = useState<Provider | undefined>(undefined)

  const oauth = async (provider: Provider) => {
    try {
      setIsPending(provider)
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
      setIsPending(undefined)
    }
  }

  return (
    <div className="flex w-60 flex-col items-center gap-y-2">
      {providers.map((p) => (
        <Button
          size="sm"
          disabled={isPending !== undefined}
          className="w-full cursor-pointer rounded"
          onClick={() => oauth(p)}
          key={p}
        >
          {isPending === p ? (
            <Loader2 className="size-4 animate-spin" />
          ) : (
            <Fragment>
              <Image
                src={`/${p.toLowerCase()}.svg`}
                alt={`/${p.toLowerCase()}_login`}
                className="dark:invert"
                width={25}
                height={25}
                priority
              />
              <span className="text-foreground">{p}</span>
            </Fragment>
          )}
        </Button>
      ))}
    </div>
  )
}
