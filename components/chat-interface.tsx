"use client"

import { AppSideBar } from "@/components/app-sidebar"
import { SidebarInset } from "@/components/ui/sidebar"
import { useEffect } from "react"
import { useChatStore } from "@/store/store"

export function ChatInterface() {
  const initialize = useChatStore((state) => state.initialize)

  useEffect(() => {
    initialize()
  }, [initialize])

  return (
    <>
      <AppSideBar />
      <SidebarInset></SidebarInset>
    </>
  )
}
