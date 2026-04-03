import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarGroup,
  SidebarGroupLabel,
} from "@/components/ui/sidebar"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  MessageCircle,
  Plus,
  RefreshCw,
  Settings,
  Loader2,
  Trash2,
  MoreHorizontal,
} from "lucide-react"
import { useState, useEffect } from "react"
import { useChatStore } from "@/store/store"
import Link from "next/link"
import Image from "next/image"

interface AppSideBarProps extends React.ComponentProps<typeof Sidebar> {
  onChatSelect?: (chatId?: string) => void
}

export function AppSideBar({ onChatSelect, ...props }: AppSideBarProps) {
  const {
    chats,
    currentChatId,
    loading,
    error,
    loadChats,
    selectChat,
    createChat,
    deleteChat,
    clearError,
  } = useChatStore()

  const [creating, setCreating] = useState<boolean>(false)
  const [deletingId, setDeletingId] = useState<string | null>(null)

  useEffect(() => {
    loadChats()
  }, [loadChats])

  const handleCreate = async () => {
    setCreating(true)
    try {
      const newChat = await createChat()
      onChatSelect?.(newChat.id)
    } finally {
      setCreating(false)
    }
  }

  const handleDelete = async (e: React.MouseEvent, chatId: string) => {
    e.preventDefault()
    e.stopPropagation()

    if (!confirm("Delete this chat? This cannot be undone.")) return

    setDeletingId(chatId)
    try {
      await deleteChat(chatId)
    } finally {
      setDeletingId(null)
    }
  }

  const handleSelect = (chatId: string) => {
    selectChat(chatId)
    onChatSelect?.(chatId)
  }

  return (
    <Sidebar {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <Link href="/">
                <div className="relative h-8 w-8 shrink-0">
                  <Image
                    src="/logo.png"
                    alt="logo"
                    fill
                    className="object-contain dark:invert"
                    priority
                  />
                </div>
                <span className="truncate text-sm font-bold">Candidate AI</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleCreate}
              disabled={creating || loading}
              className="cursor-pointer hover:bg-sidebar-accent"
            >
              <Plus className="size-4" />
              <span>New Chat</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>

        {error && (
          <div className="flex flex-col items-center justify-between gap-2 rounded-md bg-destructive/30 px-2 py-1.5 text-xs text-destructive">
            <span>{error}</span>
            <button
              onClick={clearError}
              className="cursor-pointer rounded bg-destructive/30 p-1 hover:bg-destructive/20"
            >
              Dismiss
            </button>
          </div>
        )}
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <div className="flex items-center justify-between">
            <SidebarGroupLabel className="text-xs">
              Your Chats
            </SidebarGroupLabel>
            <Tooltip>
              <TooltipTrigger asChild>
                <button
                  onClick={() => loadChats()}
                  disabled={loading}
                  className="rounded p-1 transition-colors hover:bg-muted"
                >
                  <RefreshCw
                    className={`size-4 ${loading ? "animate-spin" : ""}`}
                  />
                </button>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                Refresh
              </TooltipContent>
            </Tooltip>
          </div>
          <SidebarMenu>
            {loading && chats.length === 0 ? (
              <SidebarMenuItem>
                <div className="flex items-center gap-2 px-2 py-1.5 text-sm text-muted-foreground">
                  <Loader2 className="size-4 animate-spin" />
                  Loading chats...
                </div>
              </SidebarMenuItem>
            ) : chats.length === 0 ? (
              <SidebarMenuItem>
                <div className="px-2 py-1.5 text-center text-sm text-muted-foreground">
                  No conversations yet
                  <br />
                  <span className="text-xs">Click "New Chat" to start</span>
                </div>
              </SidebarMenuItem>
            ) : (
              chats.map((chat) => (
                <SidebarMenuItem key={chat.id}>
                  <SidebarMenuButton
                    asChild
                    isActive={currentChatId === chat.id}
                    className="group pr-2"
                  >
                    <Link
                      href={`/chat/${chat.id}`}
                      onClick={() => handleSelect(chat.id)}
                      className="flex w-full items-center justify-between"
                    >
                      <div className="flex min-w-0 items-center gap-2">
                        <MessageCircle className="size-4 shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </div>

                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <button
                            className="shrink-0 rounded p-1 opacity-0 transition-opacity group-hover:opacity-100 hover:bg-muted"
                            onClick={(e) => e.preventDefault()}
                            tabIndex={-1}
                          >
                            <MoreHorizontal className="size-4" />
                          </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={(e) => handleDelete(e, chat.id)}
                            className="text-destructive focus:text-destructive"
                            disabled={deletingId === chat.id}
                          >
                            <Trash2 className="mr-2 size-4" />
                            {deletingId === chat.id ? "Deleting..." : "Delete"}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <Tooltip>
              <TooltipTrigger asChild>
                <SidebarMenuButton asChild>
                  <Link href="/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    <span className="text-xs">Settings</span>
                  </Link>
                </SidebarMenuButton>
              </TooltipTrigger>
              <TooltipContent side="right" align="center">
                Settings
              </TooltipContent>
            </Tooltip>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  )
}
