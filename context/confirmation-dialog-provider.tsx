"use client"

import { useCallback, useState } from "react"
import {
  ConfirmationDialogProps,
  ConfirmationDialog,
} from "@/components/confirmation"
import { ConfirmationDialogContext } from "@/context/dialog-context"

export function ConfirmationDialogProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const [config, setConfig] = useState<ConfirmationDialogProps>({
    title: "",
    onConfirm: async () => {},
  })

  const openDialog = useCallback((config: ConfirmationDialogProps) => {
    setConfig(config)
    setIsOpen(true)
  }, [])

  return (
    <ConfirmationDialogContext.Provider value={{ openDialog }}>
      {children}
      <ConfirmationDialog
        open={isOpen}
        onOpenChange={setIsOpen}
        title={config.title}
        description={config.description}
        confirmLabel={config.confirmLabel}
        cancelLabel={config.cancelLabel}
        onConfirm={config.onConfirm}
      />
    </ConfirmationDialogContext.Provider>
  )
}
