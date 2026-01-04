import { Plus, MessageSquare, Trash2, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "../../components/ui/sidebar";
import { Button } from "../../components/ui/button";
import { ScrollArea } from "../../components/ui/scroll-area";

// Mock data - será substituído por estado real
const mockChats = [
  { id: "1", title: "Como criar um hook React", date: "Hoje" },
  { id: "2", title: "Explicar TypeScript generics", date: "Hoje" },
  { id: "3", title: "Setup de projeto Vite", date: "Ontem" },
  { id: "4", title: "Tailwind CSS utilities", date: "Ontem" },
  { id: "5", title: "Estado global com Zustand", date: "7 dias" },
];

export function AppSidebar() {
  return (
    <Sidebar className="border-r border-border">
      <SidebarHeader className="p-4">
        <Button className="w-full justify-start gap-2" variant="outline">
          <Plus className="h-4 w-4" />
          Nova conversa
        </Button>
      </SidebarHeader>

      <SidebarContent>
        <ScrollArea className="flex-1">
          <SidebarGroup>
            <SidebarGroupLabel>Histórico</SidebarGroupLabel>
            <SidebarGroupContent>
              <SidebarMenu>
                {mockChats.map((chat) => (
                  <SidebarMenuItem key={chat.id}>
                    <SidebarMenuButton
                      className="w-full justify-between group"
                      tooltip={chat.title}
                    >
                      <div className="flex items-center gap-2 truncate">
                        <MessageSquare className="h-4 w-4 shrink-0" />
                        <span className="truncate">{chat.title}</span>
                      </div>
                      <Trash2 className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity text-muted-foreground hover:text-destructive" />
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}
              </SidebarMenu>
            </SidebarGroupContent>
          </SidebarGroup>
        </ScrollArea>
      </SidebarContent>

      <SidebarFooter className="p-4 border-t border-border">
        <SidebarMenuButton className="w-full justify-start gap-2">
          <Settings className="h-4 w-4" />
          Configurações
        </SidebarMenuButton>
      </SidebarFooter>
    </Sidebar>
  );
}
