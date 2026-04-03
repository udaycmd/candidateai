export type Chat = Readonly<{
  id: string
  title: string
  createdAt: string
  updatedAt?: string
  messageCount?: number
}>

export type ApiError = Readonly<{
  error?: string
  code?: number
  details?: unknown
}>

export type ApiResponse<T> = Readonly<{
  data?: T
  error?: ApiError
}>
