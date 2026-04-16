import { type Chat, Message } from "@/lib/types"

const API_BASE = "/api"

export async function fetchChats(): Promise<Chat[]> {
  const res = await fetch(`${API_BASE}/chats`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store",
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return await res.json()
}

export async function addChat(title?: string): Promise<Chat> {
  const res = await fetch(`${API_BASE}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ title }),
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return await res.json()
}

export async function removeChat(id: string): Promise<void> {
  const res = await fetch(`${API_BASE}/chats/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
}

export async function fetchMessages(chatId: string): Promise<Message[]> {
  const res = await fetch(`${API_BASE}/chats/${chatId}/messages`)
  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }
  return await res.json()
}

export async function addMessage(
  chatId: string,
  role: string,
  content: string,
  sources?: any[]
): Promise<Message> {
  const res = await fetch(`${API_BASE}/chats/${chatId}/messages`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ role, content, sources }),
  })

  if (!res.ok) {
    throw new Error(`HTTP ${res.status}`)
  }

  return await res.json()
}
