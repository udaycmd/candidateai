import { Noto_Sans } from "next/font/google"
import { Toaster } from "sileo"
import { ThemeProvider } from "@/components/theme-provider"
import { TooltipProvider } from "@/components/ui/tooltip"
import { cn } from "@/lib/utils"
import "./globals.css"

const noto = Noto_Sans({
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
      className={cn("antialiased", noto.variable)}
    >
      <body>
        <ThemeProvider>
          <TooltipProvider>
            <Toaster position="top-center" />
            {children}
          </TooltipProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
