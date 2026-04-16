"use client"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { Fragment, useEffect, useState } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { Loader2, Trash2 } from "lucide-react"
import { sileo } from "sileo"
import { useRouter } from "next/navigation"
import { authClient } from "@/lib/auth-client"
import Image from "next/image"

export default function SettingsPage() {
  const router = useRouter()
  const { data: session, isPending } = authClient.useSession()
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    if (!isPending && !session) {
      router.push("/sign-in")
    }
  }, [isPending, session, router])

  if (!session) return null

  if (isPending) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="size-6 animate-spin" />
      </div>
    )
  }

  const handleDeleteAccount = async () => {
    if (
      !confirm(
        "Are you sure you want to delete your account? This action cannot be undone."
      )
    )
      return

    setIsDeleting(true)
    try {
      await authClient.deleteUser({
        fetchOptions: {
          onSuccess: () => {
            sileo.success({ title: "Account deleted successfully" })
            router.push("/sign-up")
          },
          onError: () => {
            sileo.error({
              title: "Failed to delete account",
            })
          },
        },
      })
    } finally {
      setIsDeleting(false)
    }
  }

  const dateJoined = new Date(session.user.createdAt).toLocaleDateString(
    "en-US",
    { dateStyle: "long" }
  )

  return (
    <Fragment>
      <SidebarInset className="bg-background">
        <header className="sticky top-0 z-10 flex items-center bg-background/50 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 transition-colors hover:bg-accent hover:text-accent-foreground" />
          <h1 className="ml-3 text-lg font-semibold">Settings</h1>
        </header>

        <main className="container mx-auto max-w-4xl space-y-5 p-5">
          <section>
            <h2 className="mb-5 text-2xl font-semibold">Profile</h2>
            <Card>
              <CardHeader className="flex flex-row items-center gap-4">
                <Image
                  src={session.user.image || "/avatar.png"}
                  alt={session.user.name}
                  width={55}
                  height={55}
                  className="rounded-full"
                />
                <div>
                  <CardTitle>{session.user.name}</CardTitle>
                  <CardDescription>{session.user.email}</CardDescription>
                </div>
              </CardHeader>
              <CardContent>
                <span className="text-sm text-muted-foreground">
                  Joined on {dateJoined}
                </span>
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-semibold">Appearance</h2>
            <Card>
              <CardContent className="flex flex-row items-center justify-between">
                <div>
                  <p className="font-medium">Theme</p>
                  <p className="text-sm text-muted-foreground">
                    Select your preferred theme
                  </p>
                </div>
                <ThemeToggle />
              </CardContent>
            </Card>
          </section>

          <section>
            <h2 className="mb-5 text-2xl font-semibold text-destructive">
              Danger Zone
            </h2>
            <Card className="border border-destructive bg-destructive/10">
              <CardContent className="flex flex-row items-center justify-between">
                <div>
                  <p className="font-medium">Delete Account</p>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all your data
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  disabled={isDeleting}
                  className="cursor-pointer"
                >
                  <Trash2 className="mr-2 size-4" />
                  {isDeleting ? (
                    <Loader2 className="size-4 animate-spin" />
                  ) : (
                    "Delete Account"
                  )}
                </Button>
              </CardContent>
            </Card>
          </section>
        </main>
      </SidebarInset>
    </Fragment>
  )
}
