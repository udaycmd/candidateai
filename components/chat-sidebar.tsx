"use client";

import { Menu, Plus, MessageSquare, Trash2 } from "lucide-react";
import { Button } from "./ui/button";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarTrigger,
} from "./ui/sidebar";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import { useState } from "react";

interface Conversation {
  id: string;
  title: string;
  date: string;
}

interface ChatSidebarProps {
  conversations: Conversation[];
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onDeleteChat: (id: string) => void;
  selectedChatId?: string;
}

const sampleConversations: Conversation[] = [
  { id: "1", title: "Getting started with React", date: "Today" },
  { id: "2", title: "Understanding TypeScript generics", date: "Today" },
  { id: "3", title: "CSS Grid vs Flexbox", date: "Yesterday" },
  { id: "4", title: "Node.js best practices", date: "Previous 7 Days" },
  { id: "5", title: "Database optimization tips", date: "Previous 7 Days" },
];

export function ChatSidebar({
  conversations = sampleConversations,
  onNewChat,
  onSelectChat,
  onDeleteChat,
  selectedChatId,
}: ChatSidebarProps) {
  const [isMobileOpen, setIsMobileOpen] = useState(false);

  const groupedConversations = conversations.reduce(
    (acc, conv) => {
      if (!acc[conv.date]) {
        acc[conv.date] = [];
      }
      acc[conv.date].push(conv);
      return acc;
    },
    {} as Record<string, Conversation[]>
  );

  const SidebarContentInner = () => (
    <>
      <SidebarHeader className="border-b border-sidebar-border p-4">
        <Button
          onClick={() => {
            onNewChat();
            setIsMobileOpen(false);
          }}
          className="w-full justify-start gap-2 bg-sidebar-primary text-sidebar-primary-foreground hover:bg-sidebar-primary/90"
        >
          <Plus className="h-4 w-4" />
          New Chat
        </Button>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="px-4">Conversations</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {Object.entries(groupedConversations).map(([date, convs]) => (
                <div key={date}>
                  <p className="px-4 py-2 text-xs font-medium text-muted-foreground">
                    {date}
                  </p>
                  {convs.map((conv) => (
                    <SidebarMenuItem key={conv.id}>
                      <SidebarMenuButton
                        onClick={() => {
                          onSelectChat(conv.id);
                          setIsMobileOpen(false);
                        }}
                        isActive={selectedChatId === conv.id}
                        className="group justify-between"
                      >
                        <div className="flex items-center gap-3 overflow-hidden">
                          <MessageSquare className="h-4 w-4 shrink-0" />
                          <span className="truncate">{conv.title}</span>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-6 w-6 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={(e) => {
                            e.stopPropagation();
                            onDeleteChat(conv.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  ))}
                </div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="border-t border-sidebar-border p-4">
        <div className="flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground text-sm font-medium">
            U
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="truncate text-sm font-medium">User</p>
            <p className="truncate text-xs text-muted-foreground">
              user@example.com
            </p>
          </div>
        </div>
      </SidebarFooter>
    </>
  );

  return (
    <>
      {/* Mobile trigger */}
      <div className="fixed left-2 top-2 z-50 lg:hidden">
        <Sheet open={isMobileOpen} onOpenChange={setIsMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="outline" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent
            side="left"
            className="w-[280px] p-0 lg:hidden"
            aria-describedby={undefined}
          >
            <SidebarContentInner />
          </SheetContent>
        </Sheet>
      </div>

      {/* Desktop sidebar */}
      <div className="hidden lg:block">
        <Sidebar collapsible="icon">
          <SidebarContentInner />
        </Sidebar>
      </div>
    </>
  );
}
