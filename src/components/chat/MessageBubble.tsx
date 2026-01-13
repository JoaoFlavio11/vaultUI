import { Bot, Pencil, RotateCcw, User } from "lucide-react";
import { cn } from "../../lib/utils";
import type { Message } from "../../types/chat";
import { Button } from "../ui/button";
import { CopyButton } from "./CopyButton";
import { MarkdownRenderer } from "./MarkdownRenderer";

interface MessageBubbleProps {
	message: Message;
	onRegenerate?: (messageId: string) => void;
	onEdit?: (messageId: string) => void;
}

const MessageBubble = ({
	message,
	onRegenerate,
	onEdit,
}: MessageBubbleProps) => {
	const isUser = message.role === "user";

	return (
		<div
			className={cn(
				"group flex items-start gap-3 p-4 hover:bg-muted/50 transition-colors",
				isUser && "flex-row-reverse",
			)}
		>
			{/* Avatar */}
			<div
				className={cn(
					"flex items-center justify-center w-8 h-8 rounded-full shrink-0",
					isUser ? "bg-primary text-primary-foreground" : "bg-primary/10",
				)}
			>
				{isUser ? (
					<User className="w-4 h-4" />
				) : (
					<Bot className="w-4 h-4 text-primary" />
				)}
			</div>

			{/* Content */}
			<div
				className={cn("flex flex-col max-w-[80%] gap-1", isUser && "items-end")}
			>
				<div
					className={cn(
						"rounded-2xl px-4 py-3",
						isUser
							? "bg-primary text-primary-foreground rounded-tr-md"
							: "bg-muted rounded-tl-md",
					)}
				>
					{isUser ? (
						<p className="text-sm whitespace-pre-wrap">{message.content}</p>
					) : (
						<MarkdownRenderer content={message.content} />
					)}
				</div>

				{/* Actions */}
				<div
					className={cn(
						"flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity",
						isUser && "flex-row-reverse",
					)}
				>
					<CopyButton text={message.content} />

					{isUser && onEdit && (
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							onClick={() => onEdit(message.id)}
						>
							<Pencil className="h-3 w-3" />
						</Button>
					)}

					{!isUser && onRegenerate && (
						<Button
							variant="ghost"
							size="icon"
							className="h-7 w-7"
							onClick={() => onRegenerate(message.id)}
						>
							<RotateCcw className="h-3 w-3" />
						</Button>
					)}

					<span className="text-xs text-muted-foreground px-2">
						{new Date(message.timestamp).toLocaleTimeString("pt-BR", {
							hour: "2-digit",
							minute: "2-digit",
						})}
					</span>
				</div>
			</div>
		</div>
	);
};

export default MessageBubble;
