/** biome-ignore-all lint/style/useImportType: <explanation> */
import type { ChatState } from "../types/chat.tsx";

const STORAGE_KEY = "vaultui-chat-history";

export const storage = {
	save(state: ChatState): void {
		try {
			localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
		} catch (error) {
			console.error("Failed to save chat history:", error);
		}
	},

	load(): ChatState | null {
		try {
			const data = localStorage.getItem(STORAGE_KEY);
			if (!data) return null;

			const state = JSON.parse(data) as ChatState;

			state.conversations = state.conversations.map((conv) => ({
				...conv,
				createdAt: new Date(conv.createdAt),
				updatedAt: new Date(conv.updatedAt),
				messages: conv.messages.map((msg) => ({
					...msg,
					timestamp: new Date(msg.timestamp),
				})),
			}));

			return state;
		} catch (error) {
			console.error("Failed to load chat history:", error);
			return null;
		}
	},

	clear(): void {
		localStorage.removeItem(STORAGE_KEY);
	},
};
