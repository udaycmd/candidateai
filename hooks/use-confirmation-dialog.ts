import { useContext } from "react"
import { ConfirmationDialogContext } from "@/context/dialog-context"

export function useConfirmationDialog() {
  const context = useContext(ConfirmationDialogContext)
  if (!context) {
    throw new Error(
      "useConfirmationDialog must be used within ConfirmationDialogProvider"
    )
  }

  return context
}
