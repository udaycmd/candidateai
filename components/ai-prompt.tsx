"use client"

import React, { useState, useRef, useEffect } from "react"
import { ArrowUp } from "lucide-react"
import { Button } from "@/components/ui/button"

interface PromptProps {
  onSend: (message: string) => void
  disabled?: boolean
  placeholder?: string
}

export function Prompt({ onSend, disabled = false, placeholder }: PromptProps) {
  const [message, setMessage] = useState<string>("")
  const textareaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = (
    e: React.SubmitEvent | React.KeyboardEvent<HTMLTextAreaElement>
  ) => {
    e.preventDefault()
    let msg = message.trim()

    if (msg !== "" && !disabled) {
      onSend(msg)
      setMessage("")
      if (textareaRef.current) {
        textareaRef.current.style.height = "auto"
      }
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSubmit(e)
    }
  }

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto"
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`
    }
  }, [message])

  // TODO: Refactor form below

  return (
    <div className="border-t bg-background p-4 md:p-6">
      <form onSubmit={handleSubmit} className="mx-auto max-w-3xl">
        <div className="relative flex items-end gap-2 rounded-xl border bg-card p-2 shadow-sm focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2">
          <textarea
            ref={textareaRef}
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="max-h-32 min-h-[40px] flex-1 resize-none border-2 bg-transparent px-3 py-2 text-sm focus:outline-none disabled:cursor-not-allowed disabled:opacity-50 md:text-base"
          />
          <Button
            type="submit"
            size="icon"
            disabled={!message.trim() || disabled}
            className="shrink-0 rounded-full"
          >
            <ArrowUp className="h-4 w-4" />
            <span className="sr-only">Send message</span>
          </Button>
        </div>
      </form>
    </div>
  )
}
