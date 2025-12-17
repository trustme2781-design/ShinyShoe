import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

export const getStylingAdvice = async (shoeName: string, shoeDescription: string): Promise<string> => {
  if (!apiKey) {
    return "AI styling advice is currently unavailable. Please check back later!";
  }

  try {
    const model = 'gemini-2.5-flash';
    const prompt = `
      You are a high-end streetwear fashion stylist for "ShinyShoes".
      Give me a short, punchy, and trendy outfit recommendation (max 50 words) 
      for a customer who just bought the "${shoeName}".
      
      Shoe Description: "${shoeDescription}".
      
      Focus on complementary colors and current streetwear trends. 
      Do not use hashtags. Keep it cool and professional.
    `;

    const response = await ai.models.generateContent({
      model,
      contents: prompt,
    });

    return response.text || "Pair these with some dark denim and a vintage tee for a classic look.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Pair these with some dark denim and a vintage tee for a classic look.";
  }
};

export const generateProductDescription = async (name: string, keywords: string): Promise<string> => {
    if (!apiKey) return "Premium quality sneakers designed for comfort and style.";

    try {
        const response = await ai.models.generateContent({
            model: 'gemini-2.5-flash',
            contents: `Write a compelling, premium e-commerce product description (max 2 sentences) for a sneaker named "${name}". Keywords: ${keywords}. Tone: Hypebeast, Luxury.`
        });
        return response.text || "Premium quality sneakers designed for comfort and style.";
    } catch (e) {
        return "Premium quality sneakers designed for comfort and style.";
    }
}