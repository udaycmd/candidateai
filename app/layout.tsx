import { JetBrains_Mono } from "next/font/google"
import { Toaster } from "sileo"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { ConfirmationDialogProvider } from "@/context/confirmation-dialog-provider"
import { cn } from "@/lib/utils"
import "./globals.css"

const jb = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-sans",
  preload: true,
  weight: ["400", "500", "600", "700"],
  display: "swap",
})

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn("antialiased", jb.variable)}
    >
      <body>
        <ConfirmationDialogProvider>
          <ThemeProvider>
            <TooltipProvider>
              <Toaster position="top-center" />
              {children}
            </TooltipProvider>
          </ThemeProvider>
        </ConfirmationDialogProvider>
      </body>
    </html>
  )
}
