import { cn } from "../../lib/utils";
import { useState } from "react";
import { ChatArea } from "./ChatArea";
import { Sidebar } from "./Sidebar";

export interface Message {
	id: string;
	role: "user" | "assistant";
	content: string;
	timestamp: Date;
}

export interface Conversation {
	id: string;
	title: string;
	messages: Message[];
	createdAt: Date;
	updatedAt: Date;
}

export function ChatLayout() {
	const [sidebarOpen, setSidebarOpen] = useState(true);
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [activeConversation, setActiveConversation] = useState<string | null>(
		null,
	);

	const handleNewChat = () => {
		const newConversation: Conversation = {
			id: crypto.randomUUID(),
			title: "Nova conversa",
			messages: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setConversations((prev) => [newConversation, ...prev]);
		setActiveConversation(newConversation.id);
	};

	const handleSelectConversation = (id: string) => {
		setActiveConversation(id);
	};

	const handleDeleteConversation = (id: string) => {
		setConversations((prev) => prev.filter((c) => c.id !== id));
		if (activeConversation === id) {
			setActiveConversation(null);
		}
	};

	const handleSendMessage = (content: string) => {
		if (!activeConversation) {
			handleNewChat();
		}

		const userMessage: Message = {
			id: crypto.randomUUID(),
			role: "user",
			content,
			timestamp: new Date(),
		};

		setConversations((prev) =>
			prev.map((conv) => {
				if (conv.id === activeConversation) {
					const updatedMessages = [...conv.messages, userMessage];
					return {
						...conv,
						messages: updatedMessages,
						title:
							conv.messages.length === 0
								? content.slice(0, 30) + "..."
								: conv.title,
						updatedAt: new Date(),
					};
				}
				return conv;
			}),
		);

		// Simular resposta do assistente (será substituído pela integração Ollama)
		setTimeout(() => {
			const assistantMessage: Message = {
				id: crypto.randomUUID(),
				role: "assistant",
				content:
					"Esta é uma resposta simulada. A integração com Ollama será implementada na Fase 5.",
				timestamp: new Date(),
			};

			setConversations((prev) =>
				prev.map((conv) => {
					if (conv.id === activeConversation) {
						return {
							...conv,
							messages: [...conv.messages, assistantMessage],
							updatedAt: new Date(),
						};
					}
					return conv;
				}),
			);
		}, 1000);
	};

	const currentConversation = conversations.find(
		(c) => c.id === activeConversation,
	);

	return (
		<div className="flex h-screen w-full overflow-hidden bg-background">
			<Sidebar
				isOpen={sidebarOpen}
				onToggle={() => setSidebarOpen(!sidebarOpen)}
				conversations={conversations}
				activeId={activeConversation}
				onNewChat={handleNewChat}
				onSelect={handleSelectConversation}
				onDelete={handleDeleteConversation}
			/>
			<main
				className={cn(
					"flex-1 transition-all duration-300 ease-in-out",
					sidebarOpen ? "md:ml-64" : "ml-0",
				)}
			>
				<ChatArea
					conversation={currentConversation}
					onSendMessage={handleSendMessage}
					onToggleSidebar={() => setSidebarOpen(!sidebarOpen)}
					sidebarOpen={sidebarOpen}
				/>
			</main>
		</div>
	);
}
