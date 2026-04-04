import { useState, useRef } from "react"
import { useChatStore } from "@/store/store"
import { ArrowUp, X, Paperclip, File } from "lucide-react"
import { cn } from "@/lib/utils"
import { sileo } from "sileo"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface PromptbarProps {
  chatId?: string
  disabled?: boolean
  placeholder?: string
  onSubmit: (message: string) => Promise<void>
  className?: string
}

export function PromptBar({
  chatId,
  disabled = false,
  placeholder = "Describe the problem...",
  onSubmit,
  className,
}: PromptbarProps) {
  const { createChat, loading } = useChatStore()
  const [message, setMessage] = useState<string>("")
  const [sending, setSending] = useState<boolean>(false)
  const [attachment, setAttachment] = useState<File | null>(null)

  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const adjustHeight = () => {
    const textarea = textareaRef.current
    if (textarea) {
      textarea.style.height = "auto"
      textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value)
    adjustHeight()
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit()
    }
  }

  const handleSubmit = async () => {
    if (!message.trim() || sending || disabled) return

    setSending(true)

    try {
      const activeChatId = chatId || (await createChat()).id
      await onSubmit(message)
    } catch (err) {
      sileo.error({
        title: "Something went wrong",
      })
      console.error(err instanceof Error ? err.message : { error: err })
    } finally {
      setMessage("")
      setAttachment(null)

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }

      textareaRef.current?.focus()
      setSending(false)
    }
  }

  const handleAttachFile = () => {
    const input = document.createElement("input")
    input.type = "file"
    input.onchange = (e) => {
      const file = (e.target as HTMLInputElement).files?.[0]
      if (file) setAttachment(file)
    }
    input.click()
  }

  const removeAttachment = () => {
    setAttachment(null)
  }

  const isSendDisabled = !message.trim() || sending || disabled || loading

  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      {attachment && (
        <div className="flex items-center gap-2 pt-2 pb-2">
          <div className="flex items-center gap-1.5 rounded-md bg-primary/40 px-2 py-1 text-xs font-medium text-muted-foreground shadow-xl">
            <File className="h-3 w-3 shrink-0" />
            <span className="max-w-45 truncate" title={attachment.name}>
              {attachment.name}
            </span>
            <button
              type="button"
              onClick={removeAttachment}
              className="ml-1 flex h-4 w-4 cursor-pointer items-center justify-center rounded-full transition-colors hover:bg-muted-foreground/20"
              aria-label="Remove attachment"
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        </div>
      )}

      <div className="relative rounded-xl bg-background shadow-xl">
        <Textarea
          ref={textareaRef}
          value={message}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          disabled={disabled || sending || loading}
          rows={1}
          className={cn(
            "max-h-50 min-h-11 resize-none rounded-xl px-12 focus-visible:ring-3 focus-visible:ring-primary/40",
            isSendDisabled && "opacity-50"
          )}
        />

        <Button
          type="button"
          variant="ghost"
          size="icon"
          onClick={handleAttachFile}
          disabled={disabled || sending || loading}
          className="absolute bottom-2 left-2 h-8 w-8 cursor-pointer rounded-full bg-primary/60 hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Attach file"
        >
          <Paperclip className="h-4 w-4 text-muted-foreground" />
        </Button>

        <Button
          onClick={handleSubmit}
          disabled={isSendDisabled}
          className="absolute right-2 bottom-2 h-8 w-8 cursor-pointer rounded-lg bg-foreground p-0 hover:bg-foreground/90 disabled:cursor-not-allowed disabled:opacity-50"
          aria-label="Submit prompt"
        >
          <ArrowUp className="h-4 w-4 text-background" />
        </Button>
      </div>

      <p className="mt-2 text-center text-xs text-muted-foreground">
        Press{" "}
        <kbd className="rounded-md bg-primary/60 px-1.5 py-0.5 font-mono text-xs">
          Ctrl + Enter
        </kbd>{" "}
        to submit
      </p>
    </div>
  )
}
