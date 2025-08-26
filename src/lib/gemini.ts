import { GoogleGenerativeAI } from '@google/generative-ai';

const API_KEY = "AIzaSyB6Muc_-oiu30wxYF0CpfRbHzZmGNxpxcg";

const genAI = new GoogleGenerativeAI(API_KEY);

const SYSTEM_INSTRUCTION = `ඔබ සිංහලයෙන් පිළිතුරු දෙන AI මිතුරෙක්. 
ඔබගේ කාර්යය වන්නේ ප්‍රතිචාර දීමේදී ගැඹුරු සිංහල භාවිතා කරමින්, 
මෘදු, නවීන, සහ භාවනාශීලී ආකාරයෙන් පිළිතුරු දීමයි. 
කිසිවිටෙකත් AI, Gemini, Google, හෝ API පිළිබඳ සඳහන් නොකරන්න.
ඔබ ස්වාභාවික සිංහල මිතුරෙකු ලෙස කතා කරන්න - සරල, පැහැදිලි, සහ සහයෝගී වන්න.`;

export async function getChatResponse(userMessage: string): Promise<string> {
  try {
    const model = genAI.getGenerativeModel({ 
      model: "gemini-1.5-flash",
      systemInstruction: SYSTEM_INSTRUCTION
    });

    const chat = model.startChat({
      history: [],
      generationConfig: {
        maxOutputTokens: 1000,
        temperature: 0.7,
      },
    });

    const result = await chat.sendMessage(userMessage);
    const response = await result.response;
    return response.text();
  } catch (error) {
    console.error('Gemini API Error:', error);
    
    // Fallback responses in case of API issues
    const fallbackResponses = [
      "කණගාටුයි, දැන් මට ඔබට පිළිතුරු දීමට තරමක් අපහසුයි. කරුණාකර මොහොතකට පසුව නැවත උත්සාහ කරන්න.",
      "මට ඔබේ පණිවිඩය හරියටම තේරුම් ගත නොහැකි විය. වෙනත් ආකාරයකින් අසන්න.",
      "මම දැන් ටිකක් කාර්යබහුලයි. ටික වේලාවකට පසුව නැවත සම්බන්ධ වන්න."
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
  }
}