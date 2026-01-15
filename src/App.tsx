import { useCallback, useState } from "react";
import { ChatLayout } from "./components/chat/ChatLayout";
import { ThemeProvider } from "./components/ThemeProvider";
import type { Conversation, Message } from "./types/chat";

// Função para gerar IDs únicos
const generateId = () => Math.random().toString(36).substring(2, 9);

// Resposta simulada do bot
const simulateBotResponse = (userMessage: string): Promise<string> => {
	return new Promise((resolve) => {
		setTimeout(
			() => {
				const responses = [
					`Entendi sua pergunta sobre "${userMessage.slice(0, 30)}...". Como posso ajudar mais?`,
					"Essa é uma ótima pergunta! Deixe-me analisar...\n\n```python\ndef hello():\n    print('Hello, VaultUI!')\n```\n\nEspero que isso ajude!",
					"Baseado no contexto, aqui estão algumas sugestões:\n\n1. **Primeira opção** - Mais simples\n2. **Segunda opção** - Mais robusta\n3. **Terceira opção** - Equilibrada",
					"Processando sua solicitação...\n\n> VaultScript_AI está analisando o contexto.\n\nAqui está minha análise detalhada do problema.",
				];
				resolve(responses[Math.floor(Math.random() * responses.length)]);
			},
			1500 + Math.random() * 1000,
		);
	});
};

function App() {
	const [conversations, setConversations] = useState<Conversation[]>([]);
	const [activeConversationId, setActiveConversationId] = useState<
		string | null
	>(null);
	const [isTyping, setIsTyping] = useState(false);

	// Conversa ativa atual
	const activeConversation =
		conversations.find((c) => c.id === activeConversationId) || null;

	// 1. Enviar mensagem encapsulado em useCallback para evitar erros de dependência
	const sendMessageToConversation = useCallback(
		async (conversationId: string, content: string) => {
			const userMessage: Message = {
				id: generateId(),
				role: "user",
				content,
				timestamp: new Date(),
			};

			setConversations((prev) =>
				prev.map((c) =>
					c.id === conversationId
						? {
								...c,
								messages: [...c.messages, userMessage],
								updatedAt: new Date(),
								title:
									c.messages.length === 0
										? content.slice(0, 30) + (content.length > 30 ? "..." : "")
										: c.title,
							}
						: c,
				),
			);

			setIsTyping(true);
			try {
				const botResponse = await simulateBotResponse(content);
				const botMessage: Message = {
					id: generateId(),
					role: "assistant",
					content: botResponse,
					timestamp: new Date(),
				};

				setConversations((prev) =>
					prev.map((c) =>
						c.id === conversationId
							? {
									...c,
									messages: [...c.messages, botMessage],
									updatedAt: new Date(),
								}
							: c,
					),
				);
			} finally {
				setIsTyping(false);
			}
		},
		[],
	);

	// Criar nova conversa
	const handleNewConversation = useCallback(() => {
		const newConversation: Conversation = {
			id: generateId(),
			title: "Nova conversa",
			messages: [],
			createdAt: new Date(),
			updatedAt: new Date(),
		};
		setConversations((prev) => [newConversation, ...prev]);
		setActiveConversationId(newConversation.id);
	}, []);

	// Selecionar conversa
	const handleSelectConversation = useCallback((id: string) => {
		setActiveConversationId(id);
	}, []);

	// Deletar conversa
	const handleDeleteConversation = useCallback(
		(id: string) => {
			setConversations((prev) => prev.filter((c) => c.id !== id));
			if (activeConversationId === id) {
				setActiveConversationId(null);
			}
		},
		[activeConversationId],
	);

	// Enviar mensagem (ajustado dependências)
	const handleSendMessage = useCallback(
		async (content: string) => {
			if (!activeConversationId) {
				const newId = generateId();
				const newConversation: Conversation = {
					id: newId,
					title: content.slice(0, 30) + (content.length > 30 ? "..." : ""),
					messages: [],
					createdAt: new Date(),
					updatedAt: new Date(),
				};
				setConversations((prev) => [newConversation, ...prev]);
				setActiveConversationId(newId);

				// Chamada direta para evitar problemas de sincronia do estado
				sendMessageToConversation(newId, content);
				return;
			}

			sendMessageToConversation(activeConversationId, content);
		},
		[activeConversationId, sendMessageToConversation],
	);

	// Regenerar última resposta
	const handleRegenerate = useCallback(
		async (messageId: string) => {
			if (!activeConversation || !activeConversationId) return;

			const messageIndex = activeConversation.messages.findIndex(
				(m) => m.id === messageId,
			);
			if (messageIndex === -1) return;

			const userMessage = activeConversation.messages
				.slice(0, messageIndex)
				.reverse()
				.find((m) => m.role === "user");

			if (!userMessage) return;

			setConversations((prev) =>
				prev.map((c) =>
					c.id === activeConversationId
						? { ...c, messages: c.messages.filter((m) => m.id !== messageId) }
						: c,
				),
			);

			setIsTyping(true);
			try {
				const botResponse = await simulateBotResponse(userMessage.content);
				const botMessage: Message = {
					id: generateId(),
					role: "assistant",
					content: botResponse,
					timestamp: new Date(),
				};

				setConversations((prev) =>
					prev.map((c) =>
						c.id === activeConversationId
							? {
									...c,
									messages: [...c.messages, botMessage],
									updatedAt: new Date(),
								}
							: c,
					),
				);
			} finally {
				setIsTyping(false);
			}
		},
		[activeConversation, activeConversationId],
	);

	const handleEdit = useCallback((messageId: string) => {
		console.log("Edit message:", messageId);
	}, []);

	return (
		<ThemeProvider>
			<ChatLayout
				conversations={conversations}
				activeConversation={activeConversation} // Corrigido: passando o objeto, não o ID
				messages={activeConversation?.messages || []}
				isTyping={isTyping}
				onCreateConversation={handleNewConversation} // Corrigido: nome da prop no ChatLayout
				onSelectConversation={handleSelectConversation}
				onDeleteConversation={handleDeleteConversation}
				onSendMessage={handleSendMessage}
				onRegenerate={handleRegenerate}
				onEdit={handleEdit}
			/>
		</ThemeProvider>
	);
}

export default App;
