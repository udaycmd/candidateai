"use client"

import { AppSideBar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { PromptBar } from "@/components/promptbar"
import { useEffect } from "react"
import { useChatStore } from "@/store/store"
import { Sparkles } from "lucide-react"

export function ChatInterface() {
  const initialize = useChatStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <AppSideBar />
      <SidebarInset className="flex h-full flex-col bg-background">
        <header className="sticky top-0 z-10 flex items-center border-b border-border/40 bg-background/50 px-4 py-3 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1 transition-colors hover:bg-accent hover:text-accent-foreground" />
          <span className="ml-3 hidden text-sm font-medium text-muted-foreground sm:inline"></span>
        </header>

        <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4">
          <div className="flex w-full animate-in flex-col items-center gap-6 duration-700 fill-mode-both fade-in slide-in-from-bottom-4">
            {/* Candidate AI Logo & Subtitle */}
            <div className="flex flex-col items-center gap-2 text-center">
              <div className="flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-blue-600 shadow-lg shadow-violet-500/20">
                  <Sparkles className="h-6 w-6 text-white" />
                </div>
                <h1 className="bg-gradient-to-r from-violet-600 to-blue-500 bg-clip-text text-3xl font-bold tracking-tight text-transparent">
                  Candidate AI
                </h1>
              </div>
              <p className="max-w-md text-sm leading-relaxed text-muted-foreground md:text-base">
                Your intelligent assistant for research, analysis, and creative
                problem-solving.
              </p>
            </div>

            <PromptBar onSubmit={async () => {}} />
          </div>
        </main>
      </SidebarInset>
    </>
  )
}
