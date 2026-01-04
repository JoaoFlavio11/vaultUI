/** biome-ignore-all assist/source/organizeImports: <explanation> */
import { useState } from "react";
import { ChatArea } from "../../components/chat/ChatArea";
import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { useChatHistory } from "../../hooks/useChatHistory";
import { AppSidebar } from "./AppSidebar";

export function ChatLayout() {
	const {
		conversations,
		activeConversation,
		activeConversationId,
		setActiveConversationId,
		createConversation,
		addMessage,
		deleteConversation,
	} = useChatHistory();

	const [isLoading, setIsLoading] = useState(false);

	const handleNewConversation = () => {
		createConversation();
	};

	const handleSendMessage = async (content: string) => {
		let conversationId = activeConversationId;

		// Create new conversation if none active
		if (!conversationId) {
			conversationId = createConversation(content);
		}

		// Add user message
		addMessage(conversationId, { content, role: "user" });

		// Simulate AI response
		setIsLoading(true);
		await new Promise((resolve) => setTimeout(resolve, 1500));

		addMessage(conversationId, {
			content: `Esta é uma resposta simulada para: "${content}"`,
			role: "assistant",
		});
		setIsLoading(false);
	};

	return (
		<SidebarProvider>
			<div className="flex h-screen w-full">
				<AppSidebar
					conversations={conversations}
					activeConversationId={activeConversationId}
					onSelectConversation={setActiveConversationId}
					onNewConversation={handleNewConversation}
					onDeleteConversation={deleteConversation}
				/>

				<main className="flex-1 flex flex-col">
					<header className="flex items-center gap-2 p-4 border-b border-border">
						<SidebarTrigger />
						<h1 className="text-lg font-semibold">VaultUI Chat</h1>
					</header>

					<ChatArea
						conversation={activeConversation}
						onSendMessage={handleSendMessage}
						isLoading={isLoading}
					/>
				</main>
			</div>
		</SidebarProvider>
	);
}
