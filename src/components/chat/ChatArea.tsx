import { PanelLeft } from "lucide-react";
import { ThemeToggle } from "../ThemeToggle";
import { Button } from "../ui/button";
import type { Conversation } from "./ChatLayout";
import { MessageInput } from "./MessageInput";
import { MessageList } from "./MessageList";

interface ChatAreaProps {
	conversation?: Conversation;
	onSendMessage: (content: string) => void;
	onToggleSidebar: () => void;
	sidebarOpen: boolean;
}

export function ChatArea({
	conversation,
	onSendMessage,
	onToggleSidebar,
	sidebarOpen,
}: ChatAreaProps) {
	return (
		<div className="flex h-full flex-col">
			{/* Header */}
			<header className="flex h-14 items-center justify-between border-b border-border px-4">
				<div className="flex items-center gap-2">
					{!sidebarOpen && (
						<Button
							variant="ghost"
							size="icon"
							onClick={onToggleSidebar}
							className="h-9 w-9 transition-all duration-200 hover:scale-105"
						>
							<PanelLeft className="h-4 w-4" />
						</Button>
					)}
					<h1 className="text-sm font-medium text-foreground">
						{conversation?.title || "VaultUI"}
					</h1>
				</div>
				{!sidebarOpen && <ThemeToggle />}
			</header>

			{/* Messages */}
			<div className="flex-1 overflow-hidden">
				{conversation ? (
					<MessageList messages={conversation.messages} />
				) : (
					<div className="flex h-full items-center justify-center">
						<div className="text-center animate-fade-in">
							<h2 className="text-2xl font-semibold text-foreground">
								Bem-vindo ao VaultUI
							</h2>
							<p className="mt-2 text-muted-foreground">
								Comece uma nova conversa para interagir com a IA
							</p>
						</div>
					</div>
				)}
			</div>

			{/* Input */}
			<div className="border-t border-border p-4">
				<MessageInput onSend={onSendMessage} />
			</div>
		</div>
	);
}
