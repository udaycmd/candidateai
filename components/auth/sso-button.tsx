"use client"

import { ReactNode } from "react"
import { Button } from "@/components/ui/button"

interface SSOButtonProps {
  icon: ReactNode
  provider: string
  onClick: () => void
  isLoading?: boolean
}

export function SSOButton({
  icon,
  provider,
  onClick,
  isLoading = false,
}: SSOButtonProps) {
  return (
    <Button
      onClick={onClick}
      disabled={isLoading}
      variant="outline"
      className="flex h-12 w-full items-center justify-center gap-2 rounded-lg border border-gray-300 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
    >
      <span className="shrink-0">{icon}</span>
      <span className="flex-1 text-center">
        {isLoading ? "Signing in..." : `Continue with ${provider}`}
      </span>
    </Button>
  )
}
