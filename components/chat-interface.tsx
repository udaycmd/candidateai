"use client"

import { useEffect } from "react"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/app-sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { useChatStore } from "@/store/store"
import { PromptBar } from "@/components/promptbar"

export function ChatInterface() {
  const initialize = useChatStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <AppSideBar />
      <SidebarInset className="flex max-h-screen flex-col justify-center bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background/50 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 transition-colors hover:bg-accent hover:text-accent-foreground" />
          <span className="ml-3 hidden text-sm font-medium text-muted-foreground sm:inline"></span>
          <ThemeToggle className="rounded-full border-none" />
        </header>

        <div className="flex flex-1 flex-col items-center justify-center">
          <h1 className="mb-4 animate-pulse text-lg font-bold md:text-2xl lg:text-3xl">
            Ready to get started?
          </h1>

          <PromptBar onSubmit={async () => {}} placeholder="" />
        </div>
      </SidebarInset>
    </>
  )
}
