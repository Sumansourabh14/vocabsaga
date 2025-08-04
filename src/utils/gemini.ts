import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({});

async function geminiAI(content: string) {
  if (content.length === 0) return;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: content,
    config: {
      thinkingConfig: {
        thinkingBudget: 0, // Disables thinking
      },
      systemInstruction:
        "You are an English professor. The response should be related to vocabulary/English. Response should be given automatically",
    },
  });

  return response.text;
}

export default geminiAI;
