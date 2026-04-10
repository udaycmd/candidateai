import { SidebarProvider } from "@/components/ui/sidebar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return <SidebarProvider>{children}</SidebarProvider>
}
