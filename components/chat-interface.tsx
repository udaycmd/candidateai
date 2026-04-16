"use client"

import { Fragment } from "react"
import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useChatStore } from "@/store/store"
import { PromptBar } from "@/components/promptbar"
import { addMessage } from "@/lib/api"

export function ChatInterface() {
  const router = useRouter()
  const { initialize } = useChatStore()

  useEffect(() => {
    initialize()
  }, [initialize])

  const handleInitialSubmit = async (data: {
    message: string
    files?: File[]
    chatId: string
  }) => {
    try {
      await addMessage(data.chatId, "User", data.message)
      router.push(`/chat/${data.chatId}`)
    } catch (err) {
      console.error("Failed to save initial message:", err)
    }
  }

  return (
    <Fragment>
      <SidebarInset className="flex max-h-screen flex-col justify-center bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background/50 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 transition-colors hover:bg-accent hover:text-accent-foreground" />
          <span className="ml-3 hidden text-sm font-medium text-muted-foreground sm:inline"></span>
          <ThemeToggle className="rounded-full border-none" />
        </header>

        <main className="container flex flex-1 flex-col items-center justify-center">
          <h1 className="mb-4 text-lg font-bold md:text-2xl lg:text-3xl">
            Ready to get started?
          </h1>

          <PromptBar onSubmit={handleInitialSubmit} placeholder="" />
        </main>
      </SidebarInset>
    </Fragment>
  )
}
