export function TypingIndicator() {
  return (
    <div className="flex gap-3 p-4">
      <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center">
        <div className="flex gap-1">
          <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
          <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
          <span className="h-2 w-2 bg-muted-foreground/50 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
        </div>
      </div>
    </div>
  );
}
