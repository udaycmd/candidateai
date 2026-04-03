import { type Chat, ApiError, ApiResponse } from "@/lib/types"

const API_BASE = "/api"

export async function fetchChats(): Promise<Chat[]> {
  try {
    const res = await fetch(`${API_BASE}/chats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      cache: "no-store",
    })

    if (!res.ok) {
      const error: ApiError = await res.json()
      throw new Error(error.error || `HTTP ${res.status}`)
    }

    const data: ApiResponse<Chat[]> = await res.json()
    return data.data || []
  } catch (err) {
    console.error("[API] Error:", err)
    throw err
  }
}

export async function addChat(title?: string): Promise<Chat> {
  return { id: "", title: "", createdAt: Date() }
}

export async function removeChat(id: string) {}
