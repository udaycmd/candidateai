import { useState, useRef, useEffect } from "react"
import { useChatStore } from "@/store/store"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { ArrowUp, X, Plus, File, Paperclip } from "lucide-react"
import { cn } from "@/lib/utils"
import { sileo } from "sileo"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { GlowingEffect } from "@/components/ui/glowing-effect"
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip"

interface PromptBarProps {
  chatId?: string
  disabled?: boolean
  placeholder?: string
  className?: string
  autoFocus?: boolean
  onSubmit: (data: { message: string; files?: File[] }) => Promise<void>
}

export function PromptBar({
  chatId,
  disabled = false,
  placeholder = "Describe your problem...",
  className,
  autoFocus = true,
  onSubmit,
}: PromptBarProps) {
  const { createChat, loading } = useChatStore()
  const [message, setMessage] = useState<string>("")
  const [sending, setSending] = useState<boolean>(false)
  const [attachments, setAttachments] = useState<File[]>([])
  const [isFocused, setIsFocused] = useState<boolean>(false)
  const textareaRef = useRef<HTMLTextAreaElement>(null)
  const fileinputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (autoFocus && textareaRef.current && !disabled && !loading) {
      textareaRef.current.focus()
    }
  }, [autoFocus, disabled, loading])

  const handleSubmit = async () => {
    if (!message.trim() || sending || disabled) return

    setSending(true)

    try {
      const activeChatId = chatId || (await createChat()).id
      await onSubmit({
        message: message,
        files: attachments,
      })
    } catch (err) {
      sileo.error({
        title: "Something went wrong",
      })
      console.error(err instanceof Error ? err.message : { error: err })
    } finally {
      setMessage("")
      setAttachments([])

      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }

      textareaRef.current?.focus()
      setSending(false)
    }
  }

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

  const handleAttachFiles = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const attachments = Array.from(e.target.files)
      setAttachments((prev) => [...prev, ...attachments])
    }
  }

  const removeAttachment = (index: number) => {
    setAttachments((prev) => prev.filter((_, i) => i !== index))
  }

  const isSendDisabled = !message.trim() || sending || disabled || loading

  return (
    <div className={cn("mx-auto w-full max-w-2xl", className)}>
      {attachments.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {attachments.map((file, index) => (
            <div
              key={index}
              className="flex items-center gap-2 rounded-lg border border-border bg-muted px-3 py-2"
            >
              <span className="max-w-xs text-foreground">
                <File className="h-4 w-4" />
              </span>
              <span className="max-w-xs truncate text-sm text-foreground">
                {file.name}
              </span>
              <button
                onClick={() => removeAttachment(index)}
                className="text-muted-foreground transition-colors hover:text-foreground"
                aria-label={`Remove ${file.name}`}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}

      <div
        className={`relative rounded-2xl border bg-background shadow-xs shadow-amber-100 transition-all duration-200 ${isFocused ? "input-focus" : ""
          }`}
      >
        <GlowingEffect
          borderWidth={3}
          blur={0.5}
          glow={true}
          disabled={false}
        />
        <div className="relative p-1">
          <Textarea
            ref={textareaRef}
            value={message}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder={placeholder}
            rows={1}
            className="max-h-45 min-h-11 resize-none overflow-y-auto rounded-lg border-none bg-transparent px-2 shadow-none transition-opacity duration-1000 focus-visible:ring-0 focus-visible:outline-none dark:bg-transparent"
          />
        </div>

        <div className="flex items-center justify-between rounded-2xl border-t border-border px-4 py-2">
          <div className="flex items-center gap-1">
            <Tooltip>
              <DropdownMenu>
                <TooltipTrigger asChild>
                  <DropdownMenuTrigger asChild>
                    <button
                      className="rounded-full p-2 text-muted-foreground outline-1 transition-colors hover:bg-muted hover:text-foreground focus:outline-none focus-visible:outline-none"
                      aria-label="More Options"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                  </DropdownMenuTrigger>
                </TooltipTrigger>
                <DropdownMenuContent className="z-50 min-w-48 overflow-hidden rounded-lg border bg-background shadow-md">
                  <DropdownMenuItem
                    onClick={() => fileinputRef.current?.click()}
                    className="flex cursor-pointer items-center gap-2 rounded-sm text-sm text-muted-foreground transition-colors hover:bg-muted hover:text-foreground focus:bg-muted focus:text-foreground focus:outline-none"
                    aria-label="Upload file"
                  >
                    <Paperclip className="h-4 w-4" />
                    <span>Upload Files</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <TooltipContent side="left" align="center">
                More Options
              </TooltipContent>
            </Tooltip>

            <input
              ref={fileinputRef}
              type="file"
              multiple
              onChange={handleAttachFiles}
              className="hidden"
              aria-label="File input"
            />
          </div>

          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={handleSubmit}
                disabled={isSendDisabled}
                className="h-8 w-8 cursor-pointer rounded-full bg-primary/80 p-0 transition-all disabled:cursor-not-allowed disabled:opacity-70"
                aria-label="Submit prompt"
              >
                <ArrowUp className="h-4 w-4" />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="right" align="center">
              Submit
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </div>
  )
}
