/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useRef } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { MessageBubble } from "./MessageBubble";
import type { Message } from "./ChatLayout";

interface MessageListProps {
  messages: Message[];
}

export function MessageList({ messages }: MessageListProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <ScrollArea className="h-full">
      <div className="mx-auto max-w-3xl space-y-4 p-4">
        {messages.map((message, index) => (
          <MessageBubble
            key={message.id}
            message={message}
            style={{ animationDelay: `${index * 50}ms` }}
          />
        ))}
        <div ref={bottomRef} />
      </div>
    </ScrollArea>
  );
}
