import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, User, Cloud, Globe, Newspaper, BookOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface EnhancedMessageBubbleProps {
  message: string;
  isUser: boolean;
  timestamp?: Date;
  messageType?: 'general' | 'weather' | 'translate' | 'news' | 'wikipedia';
  metadata?: any;
}

const EnhancedMessageBubble = ({ 
  message, 
  isUser, 
  timestamp, 
  messageType = 'general',
  metadata 
}: EnhancedMessageBubbleProps) => {
  
  const getMessageIcon = () => {
    if (isUser) return <User className="w-4 h-4" />;
    
    switch (messageType) {
      case 'weather':
        return <Cloud className="w-4 h-4" />;
      case 'translate':
        return <Globe className="w-4 h-4" />;
      case 'news':
        return <Newspaper className="w-4 h-4" />;
      case 'wikipedia':
        return <BookOpen className="w-4 h-4" />;
      default:
        return <Bot className="w-4 h-4" />;
    }
  };

  const renderSpecialContent = () => {
    if (isUser || messageType === 'general') return null;

    switch (messageType) {
      case 'weather':
        if (metadata) {
          return (
            <div className="mt-3 p-3 bg-primary/10 rounded-lg border border-primary/20">
              <div className="flex justify-between items-center">
                <div>
                  <p className="font-semibold text-sm">{metadata.location}</p>
                  <p className="text-2xl font-bold">{metadata.temperature}°C</p>
                  <p className="text-xs text-muted-foreground capitalize">{metadata.condition}</p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  <p>ආර්ද්‍රතාව: {metadata.humidity}%</p>
                  <p>සුළං: {metadata.windSpeed} km/h</p>
                </div>
              </div>
            </div>
          );
        }
        break;
      
      case 'news':
        if (metadata && metadata.length > 0) {
          return (
            <div className="mt-3 space-y-2">
              {metadata.slice(0, 2).map((item: any, index: number) => (
                <div key={index} className="p-3 bg-accent/10 rounded-lg border border-accent/20">
                  <h4 className="font-semibold text-sm mb-1">{item.title}</h4>
                  <p className="text-xs text-muted-foreground mb-1">{item.summary}</p>
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>{item.source}</span>
                    <span>{item.publishedAt}</span>
                  </div>
                </div>
              ))}
            </div>
          );
        }
        break;

      case 'wikipedia':
        if (metadata && metadata.length > 0) {
          const result = metadata[0];
          return (
            <div className="mt-3 p-3 bg-secondary/50 rounded-lg border border-secondary">
              <h4 className="font-semibold text-sm mb-2">{result.title}</h4>
              <p className="text-xs text-muted-foreground mb-2">{result.summary}</p>
              <a 
                href={result.url} 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-primary hover:underline"
              >
                සම්පූර්ණ ලිපිය කියවන්න →
              </a>
            </div>
          );
        }
        break;
    }

    return null;
  };

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
          {getMessageIcon()}
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
          
          {renderSpecialContent()}
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

export default EnhancedMessageBubble;