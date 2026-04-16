import { SidebarProvider } from "@/components/ui/sidebar"
import { AppSideBar } from "@/components/app-sidebar"

export default function MainLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <SidebarProvider>
      <AppSideBar className="border-none" />
      {children}
    </SidebarProvider>
  )
}
