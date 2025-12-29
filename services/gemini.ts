
import { GoogleGenAI, Type } from "@google/genai";

const getAI = () => new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const analyzeDocument = async (base64Data: string, mimeType: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: {
      parts: [
        { inlineData: { data: base64Data, mimeType } },
        { text: "Extract the core information from this college document (ID, Grade sheet, or Certificate). Provide a concise summary and verify if it looks legitimate for a college record." }
      ]
    }
  });
  return response.text;
};

export const chatWithAssistant = async (prompt: string, context: string) => {
  const ai = getAI();
  const response = await ai.models.generateContent({
    model: 'gemini-3-flash-preview',
    contents: prompt,
    config: {
      systemInstruction: `You are EduSmart, a helpful AI assistant for a college student management system. 
      The student's context is: ${context}. 
      Help them with campus navigation, fee queries, document management, and general academic advice. 
      Keep answers short and student-friendly.`
    }
  });
  return response.text;
};
