export type Role = "User" | "Ai"

export type Source = {
  id: string
  title: string
  url?: string | null
  snippet?: string | null
  metadata?: any
}

export type Message = {
  id: string
  chatId: string
  role: Role
  content: string
  createdAt: string
  sources?: Source[]
}

export type Chat = {
  id: string
  title: string
  userId: string
  createdAt: string
  updatedAt: string
  messages?: Message[]
}

export type ApiError = Readonly<{
  error?: string
  code?: number
  details?: unknown
}>

export type ApiResponse<T> = Readonly<{
  data?: T
  error?: ApiError
}>
