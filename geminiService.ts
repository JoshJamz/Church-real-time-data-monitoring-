
import { GoogleGenAI, Type } from "@google/genai";
import { AttendanceRecord, FinanceRecord } from "./types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

export const getGrowthInsights = async (attendance: AttendanceRecord[], finance: FinanceRecord[]) => {
  const prompt = `
    Analyze the following church data and provide 3 actionable growth and financial insights.
    Note that attendance is now split between Men, Women, and Children. Look for imbalances or specific demographic growth patterns.
    Format the response as a JSON array of objects with keys: title, description, type (one of: growth, finance, warning), and priority (one of: high, medium, low).
    
    Attendance History: ${JSON.stringify(attendance.slice(-10))}
    Finance History: ${JSON.stringify(finance.slice(-10))}
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              description: { type: Type.STRING },
              type: { type: Type.STRING },
              priority: { type: Type.STRING },
            },
            required: ["title", "description", "type", "priority"],
          },
        },
      },
    });

    return JSON.parse(response.text || '[]');
  } catch (error) {
    console.error("Error fetching insights:", error);
    return [];
  }
};
