import { Button } from "./components/ui/Button"; 
import { ThemeToggle } from "./components/ToggleTheme";

function App() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="flex items-center justify-between p-4 border-b border-border">
        <h1 className="text-xl font-bold">VaultScript AI</h1>
        <ThemeToggle />
      </div>

      <div className="p-8 space-y-4">
        <h2 className="text-lg font-semibold">Componentes Base</h2>
        
        <div className="flex flex-wrap gap-3">
          <Button>Primary</Button>
          <Button variant="secondary">Secondary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="outline">Outline</Button>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button size="sm">Small</Button>
          <Button size="default">Default</Button>
          <Button size="lg">Large</Button>
        </div>
      </div>
    </div>
  );
}

export default App;
