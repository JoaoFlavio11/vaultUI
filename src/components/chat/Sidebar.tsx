/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
import { 
  Cog, 
  MessageSquare, 
  MoreHorizontal, 
  Plus, 
  Trash2,
  PanelLeftClose, 
  PanelLeftOpen   
} from "lucide-react";
import { cn } from "../../lib/utils";
import type { Conversation } from "../../types/chat";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarProps {
  conversations: Conversation[];
  activeId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
  onDelete: (id: string) => void;
  isCollapsed?: boolean;
  onToggle?: () => void;
}

export function Sidebar({
  conversations,
  activeId,
  onSelect,
  onCreate,
  onDelete,
  isCollapsed = false,
  onToggle,
}: SidebarProps) {
  return (
    <aside
      className={cn(
        "flex h-full flex-col border-r border-border bg-muted/30 transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-64", // Ajustado para w-16 (padrão tailwind próximo ao seu w-15)
      )}
    >
      {/* Header Corrigido */}
      <div className={cn(
        "flex items-center border-b border-border p-3",
        isCollapsed ? "justify-center" : "justify-between"
      )}>
        {!isCollapsed && (
          <h2 className="text-sm font-semibold text-foreground truncate">Suas conversas</h2>
        )}
        
        {/* Container de botões reajustado para empilhamento vertical */}
        <div className={cn(
          "flex items-center gap-1",
          isCollapsed && "flex-col gap-2" // Empilha e adiciona espaço entre eles quando colapsado
        )}>
          <Button
            onClick={onCreate}
            size="icon"
            variant="ghost"
            className="h-8 w-8 shrink-0"
            title="Nova conversa"
          >
            <Plus className="h-4 w-4" />
          </Button>
          
          <Button
            onClick={onToggle}
            size="icon"
            variant="ghost"
            className="h-8 w-8 hidden md:flex shrink-0"
            title={isCollapsed ? "Expandir" : "Recolher"}
          >
            {isCollapsed ? <PanelLeftOpen className="h-4 w-4" /> : <PanelLeftClose className="h-4 w-4" />}
          </Button>
        </div>
      </div>

      {/* Conversations List */}
      <ScrollArea className="flex-1 p-2">
        <div className="space-y-1">
          {conversations.map((conversation) => (
            <div
              key={conversation.id}
              role="button"
              tabIndex={0}
              className={cn(
                "group flex items-center gap-2 rounded-md transition-colors outline-none",
                "cursor-pointer hover:bg-accent hover:text-accent-foreground",
                isCollapsed ? "justify-center px-0 py-2" : "px-2 py-2",
                activeId === conversation.id && "bg-accent text-accent-foreground",
              )}
              onClick={() => onSelect(conversation.id)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  onSelect(conversation.id);
                }
              }}
              title={isCollapsed ? conversation.title : ""}
            >
              <MessageSquare className="h-4 w-4 shrink-0" />
              {!isCollapsed && (
                <>
                  <span className="flex-1 truncate text-sm">
                    {conversation.title}
                  </span>
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-6 w-6 opacity-0 group-hover:opacity-100 focus:opacity-100"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <MoreHorizontal className="h-3 w-3" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuItem
                        onClick={(e) => {
                          e.stopPropagation();
                          onDelete(conversation.id);
                        }}
                        className="text-destructive focus:text-destructive"
                      >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Excluir
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              )}
            </div>
          ))}
        </div>
      </ScrollArea>

      {/* Footer */}
      <div className="border-t border-border p-3">
        <div className={cn(
          "flex items-center",
          isCollapsed ? "flex-col gap-4" : "justify-between" // Aumentado gap no colapsado
        )}>
          {!isCollapsed && (
            <span className="text-xs text-muted-foreground">VaultUI v1.0</span>
          )}
          
          <div className={cn("flex items-center gap-1", isCollapsed && "flex-col gap-2")}>
            <ThemeToggle />
            
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  size="icon"
                  variant="ghost"
                  className="h-8 w-8 shrink-0"
                >
                  <Cog className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Configurações</DialogTitle>
                  <DialogDescription>
                    Personalize sua experiência no VaultUI.
                  </DialogDescription>
                </DialogHeader>
                <div className="space-y-4 py-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium">Idioma</span>
                    <span className="text-sm text-muted-foreground">Português (BR)</span>
                  </div>
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </aside>
  );
}