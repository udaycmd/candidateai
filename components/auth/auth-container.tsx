"use client"

import { ReactNode } from "react"
import { Card } from "@/components/ui/card"

interface AuthContainerProps {
  title: string
  description?: string
  children: ReactNode
}

export function AuthContainer({
  title,
  description,
  children,
}: AuthContainerProps) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-linear-to-br from-gray-50 to-gray-100 px-4 dark:from-gray-900 dark:to-gray-800">
      <Card className="w-full max-w-md border-0 shadow-xl">
        <div className="p-8">
          <div className="mb-8 text-center">
            <h1 className="mb-2 text-3xl font-bold text-gray-900 dark:text-white">
              {title}
            </h1>
            {description && (
              <p className="text-gray-600 dark:text-gray-400">{description}</p>
            )}
          </div>
          <div className="space-y-4">{children}</div>
        </div>
      </Card>
    </div>
  )
}
