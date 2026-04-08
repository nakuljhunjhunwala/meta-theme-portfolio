import { GoogleGenAI } from "@google/genai"

let client: GoogleGenAI | null = null

function getClient(): GoogleGenAI {
  const apiKey = process.env.GEMINI_API_KEY
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured")
  }
  if (!client) {
    client = new GoogleGenAI({ apiKey })
  }
  return client
}

const MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash-lite"

export async function generateChatResponse(
  systemPrompt: string,
  userMessage: string
): Promise<string> {
  const ai = getClient()

  try {
    const response = await ai.models.generateContent({
      model: MODEL,
      contents: userMessage,
      config: {
        systemInstruction: systemPrompt,
        maxOutputTokens: 500,
        temperature: 0.3,
        topP: 0.8,
      },
    })

    const text = response.text
    if (!text || text.trim().length === 0) {
      return "I couldn't generate a response. Try rephrasing your question."
    }

    return text.trim()
  } catch (err: unknown) {
    if (err instanceof Error && err.message.includes("429")) {
      throw new Error("QUOTA_EXCEEDED")
    }
    throw err
  }
}
