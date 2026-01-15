import type { Message } from "../../types/chat";
import { MessageInput } from "./MessageInput";
import MessageList from "./MessageList";

interface ChatAreaProps {
	messages: Message[];
	isTyping?: boolean;
	onSendMessage: (content: string) => void;
	onRegenerate?: (messageId: string) => void;
	// Ajustado para (messageId: string) para coincidir com a definição do MessageList
	onEdit?: (messageId: string) => void;
}

export function ChatArea({
	messages,
	isTyping = false,
	onSendMessage,
	onRegenerate,
	onEdit,
}: ChatAreaProps) {
	return (
		<div className="flex h-full flex-col bg-background">
			<MessageList
				messages={messages}
				isTyping={isTyping}
				onRegenerate={onRegenerate}
				onEdit={onEdit}
			/>
			<MessageInput onSend={onSendMessage} disabled={isTyping} />
		</div>
	);
}
