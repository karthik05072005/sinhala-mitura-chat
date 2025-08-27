// Mock API functions for external services
// These can be replaced with real secure backend endpoints later

export interface WeatherData {
  location: string;
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
}

export interface NewsItem {
  title: string;
  summary: string;
  source: string;
  publishedAt: string;
}

export interface WikipediaResult {
  title: string;
  summary: string;
  url: string;
}

export interface TranslationResult {
  originalText: string;
  translatedText: string;
  fromLanguage: string;
  toLanguage: string;
}

// Mock Weather API
export async function getWeatherMock(location: string): Promise<WeatherData> {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  const mockData: WeatherData = {
    location: location || "කොළඹ",
    temperature: Math.floor(Math.random() * 10) + 28, // 28-38°C
    condition: ["sunny", "cloudy", "rainy", "partly cloudy"][Math.floor(Math.random() * 4)],
    humidity: Math.floor(Math.random() * 30) + 60, // 60-90%
    windSpeed: Math.floor(Math.random() * 15) + 5 // 5-20 km/h
  };
  
  return mockData;
}

// Mock Translation API
export async function translateMock(text: string, targetLang: string = "si"): Promise<TranslationResult> {
  await new Promise(resolve => setTimeout(resolve, 800));
  
  // Simple mock translation responses
  const translations: Record<string, string> = {
    "hello": "ආයුබෝවන්",
    "goodbye": "ගිහින් එන්න",
    "thank you": "ඔබට ස්තූතියි",
    "how are you": "කොහොමද?",
    "what is your name": "ඔබගේ නම කුමක්ද?",
    "good morning": "සුභ පැතුම්",
    "good night": "සුභ රාත්‍රියක්"
  };
  
  const mockTranslation = translations[text.toLowerCase()] || `${text} (පරිවර්තනය)`;
  
  return {
    originalText: text,
    translatedText: mockTranslation,
    fromLanguage: "en",
    toLanguage: targetLang
  };
}

// Mock News API
export async function getNewsMock(query?: string): Promise<NewsItem[]> {
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const mockNews: NewsItem[] = [
    {
      title: "කොළඹ නගරයේ ප්‍රවාහන සේවාව වැඩිදියුණු කිරීමට නව ක්‍රමයක්",
      summary: "කොළඹ නගර සභාව ප්‍රවාහන තදබදය අඩු කිරීම සඳහා නව බස් සේවාවක් ආරම්භ කිරීමට සැලසුම් කර ඇත.",
      source: "ලංකා නිවුස්",
      publishedAt: "2 hours ago"
    },
    {
      title: "තාක්ෂණික අධ්‍යාපනයේ නව වැඩසටහන්",
      summary: "පරිගණක විද්‍යාව හා තාක්ෂණික ක්ෂේත්‍රයන්හි යොදා ගත හැකි නව පාඨමාලා ආරම්භ කෙරේ.",
      source: "අධ්‍යාපන මාධ්‍යය",
      publishedAt: "4 hours ago"
    },
    {
      title: "ශ්‍රී ලංකාවේ පුනර්ජනන බලශක්තිය",
      summary: "සූර්ය හා සුළං බලශක්තිය වැඩි කිරීමට ආන්ඩුව නව ප්‍රතිපත්තියක් ප්‍රකාශයට පත් කරයි.",
      source: "බලශක්ති සතිය",
      publishedAt: "6 hours ago"
    }
  ];
  
  return mockNews;
}

// Mock Wikipedia API
export async function searchWikipediaMock(query: string): Promise<WikipediaResult[]> {
  await new Promise(resolve => setTimeout(resolve, 900));
  
  const mockResults: WikipediaResult[] = [
    {
      title: `${query} - විකිපීඩියාව`,
      summary: `${query} ගැන විකිපීඩියාවේ තොරතුරු. මෙය ආදර්ශ පිළිතුරක් වන අතර, සැබෑ විකිපීඩියා API එකෙන් ලැබෙන ප්‍රතිචාරයකි. වැඩි විස්තර සඳහා සම්පූර්ණ ලිපිය කියවන්න.`,
      url: `https://si.wikipedia.org/wiki/${encodeURIComponent(query)}`
    }
  ];
  
  return mockResults;
}

// Function to detect query type and route to appropriate API
export function detectQueryType(message: string): 'weather' | 'translate' | 'news' | 'wikipedia' | 'general' {
  const lowerMessage = message.toLowerCase();
  
  // Weather queries
  if (lowerMessage.includes('weather') || lowerMessage.includes('කාලගුණය') || 
      lowerMessage.includes('temperature') || lowerMessage.includes('උෂ්ණත්වය')) {
    return 'weather';
  }
  
  // Translation queries
  if (lowerMessage.includes('translate') || lowerMessage.includes('පරිවර්තනය') ||
      lowerMessage.includes('meaning') || lowerMessage.includes('අර්ථය')) {
    return 'translate';
  }
  
  // News queries
  if (lowerMessage.includes('news') || lowerMessage.includes('ප්‍රවෘත්ති') ||
      lowerMessage.includes('current') || lowerMessage.includes('latest')) {
    return 'news';
  }
  
  // Wikipedia queries
  if (lowerMessage.includes('wiki') || lowerMessage.includes('විකි') ||
      lowerMessage.includes('about') || lowerMessage.includes('ගැන') ||
      lowerMessage.includes('what is') || lowerMessage.includes('කුමක්ද')) {
    return 'wikipedia';
  }
  
  return 'general';
}