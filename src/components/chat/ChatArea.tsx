/** biome-ignore-all lint/correctness/useExhaustiveDependencies: <explanation> */
import { useEffect, useRef, useState } from 'react';
import { SendHorizontal } from 'lucide-react';
import { Button } from '../../components/ui/button';
import { ScrollArea } from '../../components/ui/scroll-area';
import { Textarea } from '../../components/ui/textarea';
import type { Conversation } from '../../types/chat';
import { MessageBubble } from './MessageBubble';
import { TypingIndicator } from './TypingIndicator';

interface ChatAreaProps {
  conversation: Conversation | null;
  onSendMessage: (content: string) => void;
  isLoading: boolean;
}

export function ChatArea({ conversation, onSendMessage, isLoading }: ChatAreaProps) {
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);
  
  const messages = conversation?.messages || [];

  // Auto-scroll para última mensagem
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: 'smooth' });
    }
    // biome-ignore lint/correctness/useExhaustiveDependencies: Necessário disparar o scroll quando a lista de mensagens muda
  }, [messages, isLoading]);

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSendMessage(input.trim());
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full">
      <ScrollArea className="flex-1 p-4">
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="max-w-md space-y-4">
              <h2 className="text-2xl font-semibold">Bem-vindo ao Chat!</h2>
              <p className="text-muted-foreground">
                Inicie uma conversa digitando sua mensagem abaixo.
              </p>
            </div>
          </div>
        ) : (
          <div className="max-w-3xl mx-auto space-y-4">
            {messages.map((message) => (
              <MessageBubble 
                key={message.id} 
                content={message.content}
                role={message.role}
                timestamp={message.timestamp}
              />
            ))}
            {isLoading && <TypingIndicator />}
            {/* Div invisível para ancorar o scroll */}
            <div ref={scrollRef} />
          </div>
        )}
      </ScrollArea>

      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto flex gap-2">
          <Textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Digite sua mensagem..."
            className="min-h-14 max-h-50 resize-none"
            disabled={isLoading}
          />
          <Button 
            onClick={handleSend} 
            disabled={!input.trim() || isLoading}
            size="icon"
            className="h-14 w-14 shrink-0"
          >
            <SendHorizontal className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}