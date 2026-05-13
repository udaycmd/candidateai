import { createContext } from "react"
import { ConfirmationDialogProps } from "@/components/confirmation"

interface ConfirmationDialogContextValue {
  openDialog: (config: ConfirmationDialogProps) => void
}

export const ConfirmationDialogContext =
  createContext<ConfirmationDialogContextValue | null>(null)
