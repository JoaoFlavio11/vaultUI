import { SidebarProvider, SidebarTrigger } from "../../components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export function ChatLayout({children}: ChatLayoutProps) {
  return(
    <SidebarProvider>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar/>
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4">
            <SidebarTrigger className="mr-4"/>
            <h1 className="text-lg font-semibold text-foreground">
              VaultScript AI
            </h1>
          </header>
          <div className="flex-1 overflow-hidden">
            {children}
          </div>
        </main>
      </div>
    </SidebarProvider>
  );
}