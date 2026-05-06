"use client"

import { useState } from "react"
import { sileo } from "sileo"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Loader2 } from "lucide-react"

interface ConfirmationDialogProps extends React.ComponentProps<
  typeof AlertDialog
> {
  title: string
  description?: string
  confirmLabel?: string
  cancelLabel?: string
  onConfirm: () => Promise<void>
}

export function ConfirmationDialog({
  title,
  description,
  confirmLabel,
  cancelLabel = "Cancel",
  onConfirm,
  ...props
}: ConfirmationDialogProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false)

  const handleConfirm = async () => {
    setIsLoading(true)
    try {
      await onConfirm()
    } catch (err) {
      sileo.error({
        title: "Unable to perform this operation",
      })
      console.error(err instanceof Error ? err.message : { error: err })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <AlertDialog {...props}>
      <AlertDialogContent size="sm">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel variant="outline" disabled={isLoading}>
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            onClick={handleConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="size-4 animate-spin" />
            ) : (
              confirmLabel
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
