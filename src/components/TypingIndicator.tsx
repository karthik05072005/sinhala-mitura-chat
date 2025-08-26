import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot } from "lucide-react";

const TypingIndicator = () => {
  return (
    <div className="flex items-start gap-3 mb-4">
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className="bg-primary text-primary-foreground">
          <Bot className="w-4 h-4" />
        </AvatarFallback>
      </Avatar>
      
      <div className="chat-bubble-bot">
        <div className="flex items-center gap-1">
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dots" style={{ animationDelay: '0ms' }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dots" style={{ animationDelay: '150ms' }}></div>
          <div className="w-2 h-2 bg-muted-foreground rounded-full typing-dots" style={{ animationDelay: '300ms' }}></div>
        </div>
      </div>
    </div>
  );
};

export default TypingIndicator;