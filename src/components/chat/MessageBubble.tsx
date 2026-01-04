import { cn } from "../../lib/utils";
import { Avatar, AvatarFallback } from "../../components/ui/avatar";
import { Bot, User } from "lucide-react";

interface MessageBubbleProps {
  content: string;
  role: "user" | "assistant";
  timestamp?: Date;
}

export function MessageBubble({ content, role, timestamp }: MessageBubbleProps) {
  const isUser = role === "user";

  return (
    <div className={cn("flex gap-3 p-4", isUser && "flex-row-reverse")}>
      <Avatar className="h-8 w-8 shrink-0">
        <AvatarFallback className={cn(
          isUser ? "bg-primary text-primary-foreground" : "bg-muted"
        )}>
          {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
        </AvatarFallback>
      </Avatar>

      <div className={cn("flex flex-col gap-1 max-w-[80%]", isUser && "items-end")}>
        <div className={cn(
          "rounded-2xl px-4 py-2",
          isUser 
            ? "bg-primary text-primary-foreground rounded-tr-sm" 
            : "bg-muted rounded-tl-sm"
        )}>
          <p className="text-sm whitespace-pre-wrap">{content}</p>
        </div>
        
        {timestamp && (
          <span className="text-xs text-muted-foreground px-2">
            {timestamp.toLocaleTimeString("pt-BR", { 
              hour: "2-digit", 
              minute: "2-digit" 
            })}
          </span>
        )}
      </div>
    </div>
  );
}
