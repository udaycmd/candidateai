"use client"

import { useEffect, useState, useRef, use } from "react"
import { AppSideBar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { PromptBar } from "@/components/promptbar"
import { useChatStore } from "@/store/store"
import { fetchMessages, addMessage } from "@/lib/api"
import { Message } from "@/lib/types"
import { Loader2 } from "lucide-react"

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: chatId } = use(params)
  const { selectChat } = useChatStore()
  const [messages, setMessages] = useState<Message[]>([])
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    if (chatId) {
      selectChat(chatId)
      loadMessages()
    }
  }, [chatId, selectChat])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  async function loadMessages() {
    setLoading(true)
    try {
      const msgs = await fetchMessages(chatId)
      setMessages(msgs)
    } catch (err) {
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (data: {
    message: string
    files?: File[]
    chatId: string
  }) => {
    const content = data.message
    if (!content.trim()) return

    // Optimistic update
    const userMsg: Message = {
      id: Math.random().toString(),
      chatId,
      role: "User",
      content,
      createdAt: new Date().toISOString(),
    }
    setMessages((prev) => [...prev, userMsg])

    try {
      await addMessage(chatId, "User", content)
      // In Phase 2 we will trigger AI response here
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
      <AppSideBar />
      <SidebarInset className="flex h-screen flex-col overflow-hidden bg-background">
        <header className="sticky top-0 z-10 flex items-center justify-between bg-background/50 px-4 py-3 backdrop-blur-sm">
          <div className="flex items-center gap-2">
            <SidebarTrigger className="-ml-1" />
          </div>
          <ThemeToggle className="rounded-full border-none" />
        </header>

        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          <div className="mx-auto max-w-3xl space-y-4 pb-20">
            {loading ? (
              <div className="flex h-full items-center justify-center py-20">
                <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex h-full items-center justify-center py-20 text-muted-foreground">
                No messages yet. Start the conversation!
              </div>
            ) : (
              messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex ${
                    msg.role === "User" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm md:text-base ${
                      msg.role === "User"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    <p className="whitespace-pre-wrap">{msg.content}</p>
                  </div>
                </div>
              ))
            )}
            <div ref={messagesEndRef} />
          </div>
        </div>

        <div className="sticky bottom-0 bg-background/80 p-4 backdrop-blur-sm">
          <PromptBar
            chatId={chatId}
            onSubmit={handleSubmit}
            placeholder="Ask a question..."
          />
        </div>
      </SidebarInset>
    </>
  )
}
