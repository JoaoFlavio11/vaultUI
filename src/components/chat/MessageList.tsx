/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useRef } from "react";
import type { Message } from "../../types/chat";
import { ScrollArea } from "../ui/scroll-area";
import EmptyState from "./EmptyState";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";

interface MessageListProps {
	messages: Message[];
	isTyping?: boolean;
	onRegenerate?: (messageId: string) => void;
	onEdit?: (messageId: string) => void;
}

const MessageList = ({
	messages,
	isTyping = false,
	onRegenerate,
	onEdit,
}: MessageListProps) => {
	const bottomRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		bottomRef.current?.scrollIntoView({ behavior: "smooth" });
	}, [messages, isTyping]);

	if (messages.length === 0 && !isTyping) {
		return <EmptyState />;
	}

	return (
		<ScrollArea className="flex-1 h-full">
			<div className="flex flex-col">
				{messages.map((message) => (
					<MessageBubble
						key={message.id}
						message={message}
						onRegenerate={onRegenerate}
						onEdit={onEdit}
					/>
				))}

				{isTyping && <TypingIndicator />}

				<div ref={bottomRef} />
			</div>
		</ScrollArea>
	);
};

export default MessageList;
