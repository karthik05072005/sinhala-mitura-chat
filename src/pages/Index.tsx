import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import ChatInterface from "@/components/ChatInterface";

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <div className="min-h-screen">
      {showChat ? (
        <ChatInterface onBack={() => setShowChat(false)} />
      ) : (
        <WelcomeScreen onStartChat={() => setShowChat(true)} />
      )}
    </div>
  );
};

export default Index;
