import { type Chat } from "@/lib/types"
import { create } from "zustand"
import { fetchChats, addChat, removeChat } from "@/lib/api"

interface ChatState {
  chats: Chat[]
  currentChatId: string | null
  loading: boolean
  error: string | null
  initialized: boolean

  initialize: () => void
  clearError: () => void
  selectChat: (id: string) => void
  loadChats: () => Promise<void>
  createChat: (title?: string) => Promise<Chat>
  updateChat: (id: string, updates: Partial<Chat>) => void
  deleteChat: (id: string) => Promise<void>
}

export const useChatStore = create<ChatState>((set, get) => ({
  chats: [],
  currentChatId: null,
  loading: false,
  error: null,
  initialized: false,

  initialize: async () => {
    if (get().initialized) return
    await get().loadChats()
    set({ initialized: true })
  },

  clearError: () => {
    set({ error: null })
  },

  selectChat: (id: string) => {
    set({
      currentChatId: id,
    })
  },

  loadChats: async () => {
    set({ loading: true, error: null })
    try {
      const chats = await fetchChats()
      set({
        chats: chats.sort(
          (a: Chat, b: Chat) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        ),
        currentChatId: chats[0]?.id || null,
        loading: false,
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to load chats",
        loading: false,
      })
    }
  },

  updateChat: (id: string, updates: Partial<Chat>) => {
    set((state) => ({
      chats: state.chats.map((chat) =>
        chat.id === id ? { ...chat, ...updates } : chat
      ),
    }))
  },

  createChat: async (title?: string) => {
    set({ loading: true, error: null })
    try {
      const newChat = await addChat(title)

      set((state) => ({
        chats: [newChat, ...state.chats],
        currentChatId: newChat.id,
        loading: false,
      }))

      return newChat
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to create chat",
        loading: false,
      })
      throw err
    }
  },

  deleteChat: async (id: string) => {
    try {
      await removeChat(id)

      set((state) => {
        const filtered = state.chats.filter((c) => c.id !== id)
        return {
          chats: filtered,
          currentChatId:
            state.currentChatId === id
              ? filtered[0]?.id || null
              : state.currentChatId,
        }
      })
    } catch (err) {
      set({
        error: err instanceof Error ? err.message : "Failed to delete chat",
      })
      throw err
    }
  },
}))
