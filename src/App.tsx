import { ThemeToggle } from "./components/ToggleTheme";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Textarea } from "./components/ui/textarea";
import { Label } from "./components/ui/label";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground p-8">
      <div className="max-w-2xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-primary">VaultScript AI</h1>
          <ThemeToggle />
        </div>

        {/* Form Components Demo */}
        <div className="space-y-6 p-6 rounded-lg border border-border bg-card">
          <h2 className="text-lg font-semibold">Componentes de Formulário</h2>
          
          {/* Input Examples */}
          <div className="space-y-2">
            <Label htmlFor="name">Nome</Label>
            <Input id="name" placeholder="Digite seu nome..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="seu@email.com" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="error-input">Input com Erro</Label>
            <Input id="error-input" placeholder="Campo com erro..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="disabled-input">Input Desabilitado</Label>
            <Input id="disabled-input" disabled placeholder="Desabilitado..." />
          </div>

          {/* Textarea Examples */}
          <div className="space-y-2">
            <Label htmlFor="message">Mensagem</Label>
            <Textarea id="message" placeholder="Digite sua mensagem..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="error-textarea">Textarea com Erro</Label>
            <Textarea id="error-textarea" placeholder="Campo com erro..." />
          </div>

          {/* Submit Button */}
          <Button className="w-full">Enviar</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
