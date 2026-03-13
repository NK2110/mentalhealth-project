import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || "" });

export async function getMentalHealthExplanation(problem: string, context?: string) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Explain the mental health issue "${problem}" to a student. 
      Focus on:
      1. What it is in simple terms.
      2. Why it commonly happens to students.
      3. How it affects the body physically (organs) and hormonally.
      4. A few actionable tips.
      
      Keep the tone supportive, calm, and educational. Use Markdown for formatting.
      ${context ? `Additional context: ${context}` : ""}`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I'm sorry, I couldn't generate an explanation right now. Please try again later.";
  }
}

export async function getSelfCheckAnalysis(data: any) {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Analyze the following student mental health self-check data:
      ${JSON.stringify(data, null, 2)}
      
      Provide:
      1. An estimated mental health risk level (Low, Moderate, High).
      2. Which body parts are likely most affected.
      3. Potential hormonal imbalances.
      4. Recommended immediate solutions.
      
      Keep the response structured and supportive. Use Markdown.`,
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "Analysis failed. Please consult a professional if you're feeling overwhelmed.";
  }
}
