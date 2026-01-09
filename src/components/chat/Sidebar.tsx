import { MessageSquare, PanelLeftClose, Plus, Trash2 } from "lucide-react";
import { cn } from "../../lib/utils";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import { ScrollArea } from "../ui/scroll-area";
import type { Conversation } from "./ChatLayout";

interface SidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  conversations: Conversation[];
  activeId: string | null;
  onNewChat: () => void;
  onSelect: (id: string) => void;
  onDelete: (id: string) => void;
}

export function Sidebar({
  isOpen,
  onToggle,
  conversations,
  activeId,
  onNewChat,
  onSelect,
  onDelete,
}: SidebarProps) {
  return (
    <>
      {/* Overlay mobile - Corrigido para ser acessível */}
      {isOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          className="fixed inset-0 z-20 bg-background/80 backdrop-blur-sm md:hidden border-none outline-none cursor-default"
          onClick={onToggle}
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") onToggle();
          }}
        />
      )}

      <aside
        className={cn(
          "fixed left-0 top-0 z-30 flex h-full w-64 flex-col border-r border-border bg-sidebar transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        {/* Header */}
        <div className="flex h-14 items-center justify-between border-b border-sidebar-border px-3">
          <span className="text-lg font-semibold text-sidebar-foreground">
            VaultUI
          </span>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Button
              variant="ghost"
              size="icon"
              type="button"
              onClick={onToggle}
              className="h-9 w-9 text-sidebar-foreground hover:bg-sidebar-accent"
            >
              <PanelLeftClose className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* New Chat Button */}
        <div className="p-3">
          <Button
            type="button"
            onClick={onNewChat}
            className="w-full justify-start gap-2 transition-all duration-200 hover:scale-[1.02]"
          >
            <Plus className="h-4 w-4" />
            Nova conversa
          </Button>
        </div>

        {/* Conversations List */}
        <ScrollArea className="flex-1 px-3">
          <div className="space-y-1 pb-4">
            {conversations.length === 0 ? (
              <p className="py-8 text-center text-sm text-muted-foreground">
                Nenhuma conversa ainda
              </p>
            ) : (
              conversations.map((conv) => (
                <div
                  key={conv.id}
                  className={cn(
                    "group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all duration-200 hover:bg-sidebar-accent",
                    activeId === conv.id && "bg-sidebar-accent",
                  )}
                >
                  <button
                    type="button" // Corrigido: explicit type
                    onClick={() => onSelect(conv.id)}
                    className="flex flex-1 items-center gap-2 truncate text-left outline-none"
                  >
                    <MessageSquare className="h-4 w-4 shrink-0 text-muted-foreground" />
                    <span className="truncate text-sidebar-foreground">
                      {conv.title}
                    </span>
                  </button>
                  <Button
                    variant="ghost"
                    size="icon"
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      onDelete(conv.id);
                    }}
                    className="h-7 w-7 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
                  </Button>
                </div>
              ))
            )}
          </div>
        </ScrollArea>

        {/* Footer */}
        <div className="border-t border-sidebar-border p-3">
          <p className="text-xs text-muted-foreground">VaultUI v0.1.0</p>
        </div>
      </aside>
    </>
  );
}