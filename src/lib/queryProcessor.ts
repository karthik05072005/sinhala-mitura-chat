import { 
  detectQueryType, 
  getWeatherMock, 
  translateMock, 
  getNewsMock, 
  searchWikipediaMock,
  WeatherData,
  NewsItem,
  WikipediaResult,
  TranslationResult
} from './mockApis';
import { getChatResponse } from './gemini';

export interface ProcessedResponse {
  message: string;
  type: 'general' | 'weather' | 'translate' | 'news' | 'wikipedia';
  metadata?: any;
}

export async function processUserQuery(userMessage: string): Promise<ProcessedResponse> {
  const queryType = detectQueryType(userMessage);
  
  try {
    switch (queryType) {
      case 'weather':
        return await handleWeatherQuery(userMessage);
      
      case 'translate':
        return await handleTranslationQuery(userMessage);
      
      case 'news':
        return await handleNewsQuery(userMessage);
      
      case 'wikipedia':
        return await handleWikipediaQuery(userMessage);
      
      default:
        return await handleGeneralQuery(userMessage);
    }
  } catch (error) {
    console.error('Error processing query:', error);
    return {
      message: "මට ඔබේ ප්‍රශ්නයට පිළිතුරු දීමට කුඩා ගැටළුවක් ඇතිවුණා. කරුණාකර නැවත උත්සාහ කරන්න.",
      type: 'general'
    };
  }
}

async function handleWeatherQuery(userMessage: string): Promise<ProcessedResponse> {
  // Extract location from message or use default
  const locationMatch = userMessage.match(/in\s+(\w+)|(\w+)\s*weather|කාලගුණය\s*(\w+)/i);
  const location = locationMatch ? locationMatch[1] || locationMatch[2] || locationMatch[3] : "කොළඹ";
  
  const weatherData: WeatherData = await getWeatherMock(location);
  
  const conditionInSinhala = {
    'sunny': 'අව්ව',
    'cloudy': 'වලාකුළු',
    'rainy': 'වැස්ස',
    'partly cloudy': 'සාමාන්‍ය වලාකුළු'
  }[weatherData.condition] || weatherData.condition;
  
  const message = `${weatherData.location} හි කාලගුණය: ${weatherData.temperature}°C උෂ්ණත්වය සමඟ ${conditionInSinhala}. ආර්ද්‍රතාව ${weatherData.humidity}% සහ සුළං වේගය ${weatherData.windSpeed} km/h.`;
  
  return {
    message,
    type: 'weather',
    metadata: weatherData
  };
}

async function handleTranslationQuery(userMessage: string): Promise<ProcessedResponse> {
  // Extract text to translate (basic extraction)
  const translateMatch = userMessage.match(/translate\s+"([^"]+)"|"([^"]+)"\s*translate|පරිවර්තනය\s*"([^"]+)"|"([^"]+)"\s*පරිවර්තනය/i);
  const textToTranslate = translateMatch ? (translateMatch[1] || translateMatch[2] || translateMatch[3] || translateMatch[4]) : userMessage.split(' ').slice(-3).join(' ');
  
  const translationResult: TranslationResult = await translateMock(textToTranslate);
  
  const message = `"${translationResult.originalText}" හි සිංහල පරිවර්තනය: "${translationResult.translatedText}"`;
  
  return {
    message,
    type: 'translate',
    metadata: translationResult
  };
}

async function handleNewsQuery(userMessage: string): Promise<ProcessedResponse> {
  const newsItems: NewsItem[] = await getNewsMock();
  
  const message = `අද දිනයේ ප්‍රධාන ප්‍රවෘත්ති:`;
  
  return {
    message,
    type: 'news',
    metadata: newsItems
  };
}

async function handleWikipediaQuery(userMessage: string): Promise<ProcessedResponse> {
  // Extract search term
  const searchTermMatch = userMessage.match(/about\s+(\w+)|(\w+)\s+ගැන|what is\s+(\w+)|(\w+)\s+කුමක්ද/i);
  const searchTerm = searchTermMatch ? (searchTermMatch[1] || searchTermMatch[2] || searchTermMatch[3] || searchTermMatch[4]) : userMessage.split(' ').slice(-1)[0];
  
  const wikiResults: WikipediaResult[] = await searchWikipediaMock(searchTerm);
  
  const message = `${searchTerm} ගැන විකිපීඩියා තොරතුරු:`;
  
  return {
    message,
    type: 'wikipedia',
    metadata: wikiResults
  };
}

async function handleGeneralQuery(userMessage: string): Promise<ProcessedResponse> {
  const aiResponse = await getChatResponse(userMessage);
  
  return {
    message: aiResponse,
    type: 'general'
  };
}