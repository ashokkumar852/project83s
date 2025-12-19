
import { GoogleGenAI, Type } from "@google/genai";
import { StudyRoadmap, QuizSet } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getConceptExplanation = async (concept: string, subject: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Explain the engineering concept "${concept}" in the context of ${subject}. Provide a clear definition, key principles, and a real-world application. Use Markdown for formatting.`,
      config: {
        systemInstruction: "You are a senior engineering professor. Explain complex topics simply but accurately using first principles. Use formatting like bold text and bullet points for readability."
      }
    });
    return response.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered an error trying to explain this concept. Please try again.";
  }
};

export const generateStudyRoadmap = async (topic: string): Promise<StudyRoadmap | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a detailed study roadmap for an engineering student to master "${topic}".`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            topic: { type: Type.STRING },
            steps: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  description: { type: Type.STRING },
                  duration: { type: Type.STRING }
                },
                required: ["title", "description", "duration"]
              }
            }
          },
          required: ["topic", "steps"]
        }
      }
    });
    
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Roadmap Generation Error:", error);
    return null;
  }
};

export const generateQuiz = async (subject: string): Promise<QuizSet | null> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Generate a 5-question multiple choice quiz for an engineering student on the subject: ${subject}. Questions should range from fundamental to advanced.`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            subject: { type: Type.STRING },
            questions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  question: { type: Type.STRING },
                  options: { type: Type.ARRAY, items: { type: Type.STRING } },
                  correctAnswer: { type: Type.INTEGER, description: "Index of the correct option (0-3)" },
                  explanation: { type: Type.STRING }
                },
                required: ["question", "options", "correctAnswer", "explanation"]
              }
            }
          },
          required: ["subject", "questions"]
        }
      }
    });
    
    return JSON.parse(response.text.trim());
  } catch (error) {
    console.error("Quiz Generation Error:", error);
    return null;
  }
};

export const getChatResponse = async (history: { role: string, content: string }[]) => {
  const contents = history.map(h => ({
    role: h.role === 'assistant' ? 'model' : 'user',
    parts: [{ text: h.content }]
  }));

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: contents as any,
      config: {
        systemInstruction: "You are 'EngiBot', an AI tutor specializing in all engineering disciplines. Help students solve problems, understand formulas, and explain derivations step-by-step."
      }
    });
    return response.text;
  } catch (error) {
    return "Something went wrong with our connection to the engineering database.";
  }
};
