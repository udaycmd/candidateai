"use client"

import { useEffect, useRef, use, useState } from "react"
import { AppSideBar } from "@/components/app-sidebar"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { ThemeToggle } from "@/components/ui/theme-toggle"
import { PromptBar } from "@/components/promptbar"
import { useChatStore } from "@/store/store"
import { fetchMessages, addMessage } from "@/lib/api"
import { Loader2 } from "lucide-react"
import { useChat } from "@ai-sdk/react"

export default function ChatPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id: chatId } = use(params)
  const { selectChat } = useChatStore()
  const [loading, setLoading] = useState(true)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const {
    messages,
    setMessages,
    append,
    reload,
    isLoading: isAiLoading,
  } = useChat({
    api: "/api/chat",
    body: {
      chatId,
    },
    onResponse: (response: Response) => {
      if (!response.ok) {
        console.error("Failed to get AI response")
      }
    },
  })

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

  // Trigger AI response if the last message is from user and no assistant message exists
  useEffect(() => {
    if (
      !loading &&
      messages.length > 0 &&
      messages[messages.length - 1].role === "user" &&
      !isAiLoading
    ) {
      const hasAssistantMessage = messages.some((m) => m.role === "assistant")
      if (!hasAssistantMessage) {
        reload()
      }
    }
  }, [loading, messages, isAiLoading, reload])

  async function loadMessages() {
    setLoading(true)
    try {
      const msgs = await fetchMessages(chatId)
      // Map database messages to useChat format
      setMessages(
        msgs.map((m) => ({
          id: m.id,
          role: m.role.toLowerCase() === "user" ? "user" : "assistant",
          content: m.content,
          createdAt: new Date(m.createdAt),
        }))
      )
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

    try {
      // Save user message to database first
      await addMessage(chatId, "User", content)

      // Trigger AI response
      await append({
        role: "user",
        content,
      })
    } catch (err) {
      console.error(err)
    }
  }

  const isPageLoading = loading && messages.length === 0

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

        <div className="flex-1 space-y-4 overflow-y-auto p-4">
          <div className="mx-auto max-w-3xl space-y-4 pb-20">
            {isPageLoading ? (
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
                    msg.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2 text-sm shadow-sm md:text-base ${
                      msg.role === "user"
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
            disabled={isAiLoading}
            placeholder="Ask a question..."
          />
        </div>
      </SidebarInset>
    </>
  )
}
