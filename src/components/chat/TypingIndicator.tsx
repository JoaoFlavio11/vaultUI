import { cn } from "../../lib/utils";

interface TypingIndicatorProps {
  className?: string;
}

const TypingIndicator = ({ className }: TypingIndicatorProps) => {
  return (
    <div className={cn("flex items-center gap-3 p-4", className)}>
      <div className="flex items-center justify-center w-8 h-8 rounded-full bg-primary/10">
        <span className="text-sm">🤖</span>
      </div>
      
      <div className="flex items-center gap-1 px-4 py-3 rounded-2xl bg-muted">
        <span className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.3s]" />
        <span className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce [animation-delay:-0.15s]" />
        <span className="w-2 h-2 rounded-full bg-foreground/50 animate-bounce" />
      </div>
    </div>
  );
};

export default TypingIndicator;
