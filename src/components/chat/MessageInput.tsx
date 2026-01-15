/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */

import { Send } from "lucide-react";
import * as React from "react";
import { cn } from "../../lib/utils";
import { Button } from "../ui/button";
import { Textarea } from "../ui/textarea";

interface MessageInputProps {
	onSend: (message: string) => void;
	disabled?: boolean;
	placeholder?: string;
}

export function MessageInput({
	onSend,
	disabled = false,
	placeholder = "Digite sua mensagem...",
}: MessageInputProps) {
	const [value, setValue] = React.useState("");
	const textareaRef = React.useRef<HTMLTextAreaElement>(null);

	const adjustHeight = () => {
		const textarea = textareaRef.current;
		if (textarea) {
			textarea.style.height = "auto";
			textarea.style.height = `${Math.min(textarea.scrollHeight, 200)}px`;
		}
	};

	React.useEffect(() => {
		adjustHeight();
	}, [value]);

	const handleSubmit = () => {
		const trimmed = value.trim();
		if (trimmed && !disabled) {
			onSend(trimmed);
			setValue("");
			if (textareaRef.current) {
				textareaRef.current.style.height = "auto";
			}
		}
	};

	const handleKeyDown = (e: React.KeyboardEvent) => {
		if (e.key === "Enter" && !e.shiftKey) {
			e.preventDefault();
			handleSubmit();
		}
	};

	return (
		<div className="border-t border-border bg-background p-4">
			<div className="mx-auto max-w-3xl">
				<div className="flex items-end gap-2 rounded-lg border border-border bg-muted/50 p-2">
					<Textarea
						ref={textareaRef}
						value={value}
						onChange={(e) => setValue(e.target.value)}
						onKeyDown={handleKeyDown}
						placeholder={placeholder}
						disabled={disabled}
						className={cn(
							"min-h-11 max-h-50 resize-none border-0 bg-transparent",
							"focus-visible:ring-0 focus-visible:ring-offset-0",
							"placeholder:text-muted-foreground",
						)}
						rows={1}
					/>
					<Button
						onClick={handleSubmit}
						disabled={disabled || !value.trim()}
						size="icon"
						className="h-10 w-10 shrink-0"
					>
						<Send className="h-4 w-4" />
						<span className="sr-only">Enviar mensagem</span>
					</Button>
				</div>
				<p className="mt-2 text-center text-xs text-muted-foreground">
					Pressione{" "}
					<kbd className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
						Enter
					</kbd>{" "}
					para enviar,
					<kbd className="ml-1 rounded bg-muted px-1 py-0.5 font-mono text-xs">
						Shift+Enter
					</kbd>{" "}
					para nova linha
				</p>
			</div>
		</div>
	);
}
