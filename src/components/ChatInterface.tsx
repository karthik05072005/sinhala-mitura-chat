import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft, Send } from "lucide-react";
import MessageBubble from "./MessageBubble";
import TypingIndicator from "./TypingIndicator";
import { cn } from "@/lib/utils";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface = ({ onBack }: ChatInterfaceProps) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      text: "ආයුබෝවන්! මම ඔබේ සිංහල AI මිතුරයා. ඔබට කුමක් දැන ගැනීමට අවශ්‍යද?",
      isUser: false,
      timestamp: new Date()
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

  const simulateAIResponse = async (userMessage: string): Promise<string> => {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 1000 + Math.random() * 2000));
    
    // Simple Sinhala responses for demo
    const responses = [
      "ඔබේ ප්‍රශ්නය ගැන මම සිතමින් සිටිමි. වැඩි විස්තර කියන්න.",
      "එය සිත්ගන්නා කරුණක්! මට ඔබට උදව් කළ හැකි ආකාරය මොකක්ද?",
      "සිංහල භාෂාවෙන් ඔබ සමඟ කතා කිරීම මට සතුටක්. තවත් කියන්න.",
      "ඔබේ මතය අගය කරමි. වැඩි විස්තර සහිත උදාහරණයක් දෙන්න.",
      "හොඳ ප්‍රශ්නයක්! මම ඔබට යම් යෝජනා කිහිපයක් දෙන්නම්."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
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
      const aiResponse = await simulateAIResponse(inputMessage);
      
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponse,
        isUser: false,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error("Error getting AI response:", error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "කණගාටුයි, දැන් මට පිළිතුරු දිය නොහැක. කරුණාකර නැවත උත්සාහ කරන්න.",
        isUser: false,
        timestamp: new Date()
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
        <div>
          <h2 className="font-semibold text-heading font-poppins">සිංහල AI මිතුරා</h2>
          <p className="text-sm text-muted-foreground font-poppins">සම්බන්ධිතයි</p>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 pb-24">
        <div className="max-w-4xl mx-auto">
          {messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message.text}
              isUser={message.isUser}
              timestamp={message.timestamp}
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
            placeholder="ඔබේ පණිවිඩය යොදන්න..."
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