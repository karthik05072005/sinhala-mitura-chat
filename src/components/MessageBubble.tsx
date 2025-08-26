import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
}

const MessageBubble = ({ message, isUser, timestamp }: MessageBubbleProps) => {
  return (
    <div className={cn(
      "flex items-start gap-3 mb-4 message-enter",
      isUser ? "flex-row-reverse" : "flex-row"
    )}>
      <Avatar className="w-8 h-8 flex-shrink-0">
        <AvatarFallback className={cn(
          isUser 
            ? "bg-accent text-accent-foreground" 
            : "bg-primary text-primary-foreground"
        )}>
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </AvatarFallback>
      </Avatar>
      
      <div className={cn(
        "flex flex-col gap-1",
        isUser ? "items-end" : "items-start"
      )}>
        <div className={cn(
          "max-w-xs lg:max-w-md xl:max-w-lg break-words",
          isUser ? "chat-bubble-user" : "chat-bubble-bot"
        )}>
          <p className="text-sm font-poppins leading-relaxed">
            {message}
          </p>
        </div>
        
        {timestamp && (
          <span className="text-xs text-muted-foreground font-poppins">
            {timestamp.toLocaleTimeString('si-LK', { 
              hour: '2-digit', 
              minute: '2-digit' 
            })}
          </span>
        )}
      </div>
    </div>
  );
};

export default MessageBubble;