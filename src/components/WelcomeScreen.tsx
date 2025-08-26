import { Button } from "@/components/ui/button";
import { MessageCircle, Sparkles } from "lucide-react";

interface WelcomeScreenProps {
  onStartChat: () => void;
}

const WelcomeScreen = ({ onStartChat }: WelcomeScreenProps) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="text-center max-w-2xl mx-auto animate-fade-in">
        <div className="mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-primary rounded-full mb-6 animate-scale-in">
            <MessageCircle className="w-10 h-10 text-primary-foreground" />
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-heading mb-4 font-poppins">
            ඔබේ සිංහල AI මිතුරා
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-poppins">
            සියලුම ගැටළු සඳහා කථා කරමු
          </p>
          
          <div className="flex items-center justify-center gap-4 mb-8 text-primary">
            <Sparkles className="w-6 h-6" />
            <span className="text-lg font-medium font-poppins">
              ස්වාභාවික සිංහල කතාබස්
            </span>
            <Sparkles className="w-6 h-6" />
          </div>
        </div>
        
        <Button 
          onClick={onStartChat}
          className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg rounded-full font-poppins font-semibold transition-all hover:scale-105 shadow-lg"
        >
          කතාබස් ආරම්භ කරන්න
        </Button>
        
        <div className="mt-8 flex items-center justify-center gap-6 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="font-poppins">ආරක්ෂිත</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="font-poppins">වේගවත්</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-accent rounded-full"></div>
            <span className="font-poppins">සහයෝගී</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WelcomeScreen;