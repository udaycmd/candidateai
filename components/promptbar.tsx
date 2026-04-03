interface PromptbarProps {
  chatId?: string | null
  disabled?: boolean
  placeholder?: string
  onSubmit?: (message: string) => Promise<void>
  className?: string
  maxLines?: number
  showEnhancedButton?: boolean
}

export function PromptBar({
  chatId,
  disabled = false,
  placeholder = "Type your message...",
  onSubmit,
  className,
  maxLines = 8,
  showEnhancedButton = true,
}: PromptbarProps) {
  return <h1>Hello</h1>
}
