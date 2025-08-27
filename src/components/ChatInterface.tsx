import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send, Sparkles } from "lucide-react";
import EnhancedMessageBubble from "./EnhancedMessageBubble";
import TypingIndicator from "./TypingIndicator";
import FeatureCards from "./FeatureCards";
import { processUserQuery } from "@/lib/queryProcessor";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
  type?: 'general' | 'weather' | 'translate' | 'news' | 'wikipedia';
  metadata?: any;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "ආයුබෝවන්! මම ඔබේ බුද්ධිමත් සිංහල මිතුරයා. මට කාලගුණය, ප්‍රවෘත්ති, පරිවර්තන, විකිපීඩියා සෙවීම් සහ සාමාන්‍ය කථාබහ සියල්ලටම උදව් කළ හැක. ඔබට කුමක් අවශ්‍යද?",
      isUser: false,
      timestamp: new Date(),
      type: 'general'
    }
  ]);
  
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isTyping]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Enhanced AI response with multiple data sources
  const getAIResponse = async (userMessage: string) => {
    return await processUserQuery(userMessage);
  };

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputMessage,
      isUser: true,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    try {
      const aiResponse = await getAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse.message,
        isUser: false,
        timestamp: new Date(),
        type: aiResponse.type,
        metadata: aiResponse.metadata
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "කණගාටුයි, දැන් මට ඔබට සාකච්ඡා කිරීමට ටිකක් අපහසුයි. මොහොතකට පසුව නැවත උත්සාහ කරන්න.",
        isUser: false,
        timestamp: new Date(),
        type: 'general'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFeatureClick = (query: string) => {
    setInputMessage(query);
    // Auto-send the message
    setTimeout(() => {
      const event = { key: "Enter", shiftKey: false, preventDefault: () => {} };
      handleKeyPress(event as any);
    }, 100);
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Header */}
      <div className="bg-card border-b px-4 py-4 flex items-center gap-3 shadow-sm">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={onBack}
          className="hover:bg-muted"
        >
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-primary" />
          <div>
            <h2 className="font-semibold text-heading font-poppins">සිංහල AI මිතුරා</h2>
            <p className="text-sm text-muted-foreground font-poppins">කාලගුණය • ප්‍රවෘත්ති • පරිවර්තන • විකි</p>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {/* Show feature cards when no messages except welcome */}
          {messages.length === 1 && (
            <div className="mb-6">
              <FeatureCards onFeatureClick={handleFeatureClick} />
            </div>
          )}
          
          {messages.map((message) => (
            <EnhancedMessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
              messageType={message.type}
              metadata={message.metadata}
            />
          ))}
          
          {isTyping && <TypingIndicator />}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input */}
      <div className="floating-input">
        <div className="bg-card border rounded-full p-2 shadow-lg flex items-center gap-2">
          <Input
            ref={inputRef}
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="කාලගුණය, ප්‍රවෘත්ති, පරිවර්තන ගැන අසන්න..."
            className="border-0 bg-transparent focus-visible:ring-0 font-poppins"
            disabled={isTyping}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputMessage.trim() || isTyping}
            className={cn(
              "rounded-full w-10 h-10 p-0",
              inputMessage.trim() && !isTyping
                ? "bg-primary hover:bg-primary/90 text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            <Send className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;