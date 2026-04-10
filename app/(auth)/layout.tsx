import { BackgroundLines } from "@/components/ui/background-lines"

export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <BackgroundLines className="flex min-h-screen w-full flex-col items-center justify-center">
      {children}
    </BackgroundLines>
  )
}
