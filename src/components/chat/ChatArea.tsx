import { SendHorizontal } from "lucide-react";
import { Button } from "../../components/ui/button";
import { Textarea } from "../../components/ui/textarea";
import { ScrollArea } from "../../components/ui/scroll-area";

export function ChatArea(){
  return(
    <div className="flex flex-col h-full">
      {/* Área de mensagens */}
      <ScrollArea className="flex-1 p-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {/* Mensagem de boas-vindas */}
          <div className="text-center py-12">
            <h2 className="text-2xl font-bold text-foreground mb-2">
              Olá! Sou o VaultScript AI
            </h2>
            <p className="text-muted-foreground">
              Como posso te ajudar hoje?
            </p>
          </div>
        </div>
      </ScrollArea>

      {/* Input de mensagem */}
      <div className="border-t border-border p-4">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <Textarea
              placeholder="Digite sua mensagem..."
              className="min-h-[60px] max-h-[200px] pr-14 resize-none"
              rows={1}
            />
            <Button
              size="icon"
              className="absolute right-2 bottom-2"
            >
              <SendHorizontal className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            VaultScript AI pode cometer erros. Verifique informações importantes.
          </p>
        </div>
      </div>
    </div>
  );
}