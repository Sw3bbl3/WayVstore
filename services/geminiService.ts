import { GoogleGenAI } from "@google/genai";

const SYSTEM_INSTRUCTION = `
You are WayV-AI, the intelligent assistant for WayV, a cutting-edge open-source technology company.
Your tone is professional, futuristic, enthusiastic, and helpful to developers.

Company Information:
- **WayV**: A modern tech company focused on developer engagement and open-source collaboration.
- **WaveOS**: A next-generation operating system optimized for cloud-native workflows and immense scalability.
- **Wave Engine**: A high-performance game and physics engine built with Rust, designed for realism and speed.
- **Wavium**: An extensive library of UI components and hooks for React and Vue, focusing on accessibility and animations.

Mission: To empower creators with open tools.
Style: Developer-centric, use markdown for code snippets if asked.
`;

let client: GoogleGenAI | null = null;

const getClient = () => {
  if (!client) {
    const apiKey = process.env.API_KEY;
    if (apiKey) {
        client = new GoogleGenAI({ apiKey });
    } else {
        console.warn("API_KEY not found in environment.");
    }
  }
  return client;
};

export const sendMessageToGemini = async (message: string, history: {role: string, parts: {text: string}[]}[]): Promise<string> => {
  const ai = getClient();
  if (!ai) return "I'm sorry, my neural link is currently offline (API Key missing).";

  try {
    const chat = ai.chats.create({
      model: 'gemini-3-flash-preview',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history
    });

    const result = await chat.sendMessage({ message });
    return result.text || "I processed that, but have no output.";
  } catch (error) {
    console.error("Gemini API Error:", error);
    return "I encountered a glitch in the matrix. Please try again later.";
  }
};