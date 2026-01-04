import { useCallback, useEffect, useState } from "react";
import { storage } from "../lib/storage";
// CORREÇÃO 1: Usar 'import type' para interfaces e remover ChatState (não usado)
import type { Conversation, Message } from "../types/chat";

export function useChatHistory() {
	// CORREÇÃO 2: Inicialização Lazy (preguiçosa) do useState.
	// Isso resolve o erro do ESLint e evita o "flicker" de tela branca inicial.
	const [conversations, setConversations] = useState<Conversation[]>(() => {
		const saved = storage.load();
		return saved ? saved.conversations : [];
	});

	const [activeConversationId, setActiveConversationId] = useState<
		string | null
	>(() => {
		const saved = storage.load();
		return saved ? saved.activeConversationId : null;
	});

	// Nota: O useEffect de "Load" foi removido pois a lógica subiu para o useState acima.

	// Save to localStorage on changes
	useEffect(() => {
		storage.save({ conversations, activeConversationId });
	}, [conversations, activeConversationId]);

	const activeConversation =
		conversations.find((c) => c.id === activeConversationId) || null;

	const createConversation = useCallback((firstMessage?: string): string => {
		const id = crypto.randomUUID();
		const now = new Date();

		const newConversation: Conversation = {
			id,
			title: firstMessage?.slice(0, 30) || "Nova conversa",
			messages: [],
			createdAt: now,
			updatedAt: now,
		};

		setConversations((prev) => [newConversation, ...prev]);
		setActiveConversationId(id);
		return id;
	}, []);

	const addMessage = useCallback(
		(conversationId: string, message: Omit<Message, "id" | "timestamp">) => {
			const newMessage: Message = {
				...message,
				id: crypto.randomUUID(),
				timestamp: new Date(),
			};

			setConversations((prev) =>
				prev.map((conv) => {
					if (conv.id !== conversationId) return conv;

					const updatedMessages = [...conv.messages, newMessage];
					const shouldUpdateTitle =
						conv.messages.length === 0 && message.role === "user";

					return {
						...conv,
						messages: updatedMessages,
						// CORREÇÃO 3: Template literal em vez de concatenação (+)
						title: shouldUpdateTitle
							? `${message.content.slice(0, 30)}...`
							: conv.title,
						updatedAt: new Date(),
					};
				}),
			);

			return newMessage;
		},
		[],
	);

	const deleteConversation = useCallback(
		(id: string) => {
			setConversations((prev) => prev.filter((c) => c.id !== id));
			if (activeConversationId === id) {
				setActiveConversationId(null);
			}
		},
		[activeConversationId],
	);

	const clearAllConversations = useCallback(() => {
		setConversations([]);
		setActiveConversationId(null);
		storage.clear();
	}, []);

	return {
		conversations,
		activeConversation,
		activeConversationId,
		setActiveConversationId,
		createConversation,
		addMessage,
		deleteConversation,
		clearAllConversations,
	};
}
