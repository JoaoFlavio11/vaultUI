/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { Send } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface MessageInputProps {
	onSend: (content: string) => void;
	disabled?: boolean;
}

export function MessageInput({ onSend, disabled }: MessageInputProps) {
	const [value, setValue] = useState("");
	const textareaRef = useRef<HTMLTextAreaElement>(null);

	const handleSubmit = () => {
		const trimmed = value.trim();
		if (trimmed && !disabled) {
			onSend(trimmed);
			setValue("");
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	// Auto-resize textarea
	useEffect(() => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
		}
	}, [value]);

	return (
		<div className="mx-auto flex max-w-3xl items-end gap-2">
			<Textarea
				ref={textareaRef}
				value={value}
				onChange={(e) => setValue(e.target.value)}
				onKeyDown={handleKeyDown}
				placeholder="Digite sua mensagem..."
				disabled={disabled}
				className="min-h-11 max-h-50 resize-none transition-all duration-200"
				rows={1}
			/>
			<Button
				onClick={handleSubmit}
				disabled={!value.trim() || disabled}
				size="icon"
				className="h-11 w-11 shrink-0 transition-all duration-200 hover:scale-105"
			>
				<Send className="h-4 w-4" />
			</Button>
		</div>
	);
}
