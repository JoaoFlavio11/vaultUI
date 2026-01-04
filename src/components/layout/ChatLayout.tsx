import { SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar';
import { AppSidebar } from './AppSidebar';
import { useChatHistory } from '../../hooks/useChatHistory';
import { ChatArea } from '../../components/chat/ChatArea';
import { useState } from 'react';

export function ChatLayout() {
  const {
    conversations,
    activeConversation,
    activeConversationId,
    setActiveConversationId,
    createConversation,
    addMessage,
    deleteConversation,
  } = useChatHistory();

  const [isLoading, setIsLoading] = useState(false);

  const handleNewConversation = () => {
    createConversation();
  };

  const handleSendMessage = async (content: string) => {
    let conversationId = activeConversationId;
    
    // Create new conversation if none active
    if (!conversationId) {
      conversationId = createConversation(content);
    }

    // Add user message
    addMessage(conversationId, { content, role: 'user' });

    // Simulate AI response
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    addMessage(conversationId, {
      content: `Esta é uma resposta simulada para: "${content}"`,
      role: 'assistant',
    });
    setIsLoading(false);
  };

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full">
        <AppSidebar
          conversations={conversations}
          activeConversationId={activeConversationId}
          onSelectConversation={setActiveConversationId}
          onNewConversation={handleNewConversation}
          onDeleteConversation={deleteConversation}
        />
        
        <main className="flex-1 flex flex-col">
          <header className="h-14 border-b border-border flex items-center px-4 gap-4">
            <SidebarTrigger />
            <h1 className="font-semibold">
              {activeConversation?.title || 'Nova Conversa'}
            </h1>
          </header>
          
          <ChatArea
            conversation={activeConversation}
            onSendMessage={handleSendMessage}
            isLoading={isLoading}
          />
        </main>
      </div>
    </SidebarProvider>
  );
}
