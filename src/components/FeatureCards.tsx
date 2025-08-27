import { Card, CardContent } from "@/components/ui/card";
import { Cloud, Globe, Newspaper, BookOpen } from "lucide-react";

interface FeatureCardsProps {
  onFeatureClick: (query: string) => void;
}

const FeatureCards = ({ onFeatureClick }: FeatureCardsProps) => {
  const features = [
    {
      icon: <Cloud className="w-5 h-5" />,
      title: "කාලගුණය",
      description: "අද දිනයේ කාලගුණය",
      query: "කොළඹ කාලගුණය කුමක්ද?"
    },
    {
      icon: <Newspaper className="w-5 h-5" />,
      title: "ප්‍රවෘත්ති",
      description: "නවතම ප්‍රවෘත්ති",
      query: "අද දිනයේ ප්‍රවෘත්ති"
    },
    {
      icon: <Globe className="w-5 h-5" />,
      title: "පරිවර්තනය",
      description: "ඉංග්‍රීසි සිංහලට",
      query: "translate \"hello\""
    },
    {
      icon: <BookOpen className="w-5 h-5" />,
      title: "විකිපීඩියා",
      description: "ඕනෑම දෙයක් සොයන්න",
      query: "ශ්‍රී ලංකාව ගැන"
    }
  ];

  return (
    <div className="grid grid-cols-2 gap-3 mb-6">
      {features.map((feature, index) => (
        <Card 
          key={index}
          className="cursor-pointer hover:bg-secondary/50 transition-colors"
          onClick={() => onFeatureClick(feature.query)}
        >
          <CardContent className="p-3">
            <div className="flex items-center gap-2 mb-1">
              <div className="text-primary">
                {feature.icon}
              </div>
              <h3 className="font-semibold text-sm">{feature.title}</h3>
            </div>
            <p className="text-xs text-muted-foreground">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default FeatureCards;