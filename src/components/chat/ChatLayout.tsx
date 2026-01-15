/** biome-ignore-all lint/a11y/useSemanticElements: <explanation> */
import * as React from "react";
import { Menu } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Conversation, Message } from "../../types/chat";
import { Button } from "../ui/button";
import { ChatArea } from "./ChatArea";
import { Sidebar } from "./Sidebar";

interface ChatLayoutProps {
  conversations: Conversation[];
  activeConversation: Conversation | null;
  messages: Message[];
  isTyping?: boolean;
  onSelectConversation: (id: string) => void;
  onCreateConversation: () => void;
  onDeleteConversation: (id: string) => void;
  onSendMessage: (content: string) => void;
  onRegenerate?: (messageId: string) => void;
  // Ajustado para 1 argumento para ser compatível com ChatArea
  onEdit?: (messageId: string) => void;
}

export function ChatLayout({ ...props }: ChatLayoutProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);

  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Mobile Overlay */}
      {mobileOpen && (
        <div
          role="button"
          tabIndex={-1}
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm md:hidden"
          onClick={() => setMobileOpen(false)}
          onKeyDown={(e) => e.key === "Enter" && setMobileOpen(false)}
        />
      )}

      {/* Sidebar - Desktop & Mobile */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 md:relative md:translate-x-0 transition-transform duration-300",
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <Sidebar
          conversations={props.conversations}
          activeId={props.activeConversation?.id ?? null}
          onSelect={(id) => {
            props.onSelectConversation(id);
            setMobileOpen(false);
          }}
          onCreate={props.onCreateConversation}
          onDelete={props.onDeleteConversation}
          isCollapsed={sidebarCollapsed}
          onToggle={() => setSidebarCollapsed(!sidebarCollapsed)} // Lógica de fechar/abrir
        />
      </div>

      {/* Main Content */}
      <div className="flex flex-1 flex-col min-w-0"> {/* min-w-0 evita quebra de layout com truncate */}
        {/* Header - Mobile ou Desktop quando Sidebar está fechada */}
        <header className="flex items-center gap-2 border-b border-border p-3">
          {/* Menu Hambúrguer para Mobile */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="h-5 w-5" />
          </Button>

          {/* Botão de abrir Sidebar caso esteja colapsada (Opcional, estilo ChatGPT) */}

          <h1 className="text-sm font-medium truncate">
            {props.activeConversation?.title ?? "VaultUI"}
          </h1>
        </header>

        {/* Chat Area */}
        <div className="flex-1 overflow-hidden">
          <ChatArea
            messages={props.messages}
            isTyping={props.isTyping}
            onSendMessage={props.onSendMessage}
            onRegenerate={props.onRegenerate}
            onEdit={props.onEdit}
          />
        </div>
      </div>
    </div>
  );
}