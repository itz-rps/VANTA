import { GoogleGenAI } from "@google/genai";

const GEMINI_MODEL = "gemini-2.0-flash";
const GROQ_MODEL = "llama-3.3-70b-versatile";
const GROQ_URL = "https://api.groq.com/openai/v1/chat/completions";

let geminiQuotaExhausted = false;

/**
 * Returns info about the current active provider.
 */
export function getAIProvider() {
  return {
    name: "Hybrid",
    isFallback: false,
    label: "Gemini + Groq + Lobster Trap"
  };
}

function extractJSON(raw: string): any {
  // Remove markdown code blocks
  let cleaned = raw
    .replace(/```json\n?/g, '')
    .replace(/```\n?/g, '')
    .trim();
  
  // Try direct parse first
  try {
    return JSON.parse(cleaned);
  } catch (e) {}
  
  // Find JSON array in response
  const arrayMatch = cleaned.match(/\[[\s\S]*\]/);
  if (arrayMatch) {
    try {
      return JSON.parse(arrayMatch[0]);
    } catch (e) {}
  }
  
  // Find JSON object in response
  const objMatch = cleaned.match(/\{[\s\S]*\}/);
  if (objMatch) {
    try {
      return JSON.parse(objMatch[0]);
    } catch (e) {}
  }
  
  // All parsing failed — return null for caller to handle
  console.log('JSON parse failed. Raw snippet:', raw.substring(0, 300));
  return null;
}

/**
 * Internal call AI with automatic failover.
 */
async function callAIInternal(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  // Try Gemini first if quota not exhausted
  if (!geminiQuotaExhausted) {
    try {
      return await callGemini(systemPrompt, userPrompt);
    } catch (err: any) {
      const errorMsg = err?.message?.toLowerCase() || '';
      const isQuotaError = 
        err?.status === 429 || 
        err?.code === 429 ||
        errorMsg.includes('429') ||
        errorMsg.includes('quota') ||
        errorMsg.includes('resource_exhausted') ||
        errorMsg.includes('limit: 0') ||
        errorMsg.includes('too many requests');
      
      if (isQuotaError) {
        console.warn('Gemini quota exhausted. Switching to Groq automatically.');
        geminiQuotaExhausted = true;
        // Fall through to Groq
      } else {
        console.error('Gemini error, trying Groq:', err.message);
      }
    }
  }

  // Groq fallback
  try {
    return await callGroq(systemPrompt, userPrompt);
  } catch (err: any) {
    console.error('Groq call failed:', err.message);
    throw err;
  }
}

/**
 * Main AI entry point with retry logic.
 */
export async function callAI(
  systemPrompt: string,
  userPrompt: string,
  retries = 3
): Promise<string> {
  try {
    return await callAIInternal(systemPrompt, userPrompt);
  } catch (err: any) {
    const errorMsg = err.message?.toLowerCase() || '';
    if (
      (errorMsg.includes('rate limit') || errorMsg.includes('429') || errorMsg.includes('too many requests')) &&
      retries > 0
    ) {
      console.log(`Rate limited. Waiting 3s... (Retries left: ${retries})`);
      await new Promise(resolve => setTimeout(resolve, 3000));
      return callAI(systemPrompt, userPrompt, retries - 1);
    }
    throw err;
  }
}

/**
 * JSON wrapper for callAI with sanitation.
 */
export async function callAIJSON(
  userPrompt: string,
  systemPrompt?: string,
  schema?: any
): Promise<any> {
  const text = await callAI(systemPrompt || "You are a helpful assistant. Return ONLY valid JSON.", userPrompt);
  
  const parsed = extractJSON(text);
  if (parsed !== null) return parsed;

  console.error("Failed to parse AI response as JSON even with extraction. Raw response:", text);
  return null; // Return null instead of throwing to let the caller handle it safely
}

async function callGemini(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY is not set");

  const client = new GoogleGenAI({ 
    apiKey,
    httpOptions: {
      headers: { 'User-Agent': 'aistudio-build' }
    }
  });

  const response = await client.models.generateContent({
    model: GEMINI_MODEL,
    contents: [{ role: 'user', parts: [{ text: userPrompt }] }],
    config: {
      systemInstruction: systemPrompt,
      temperature: 0.7,
    }
  });
  
  return response.text ?? "";
}

async function callGroq(
  systemPrompt: string,
  userPrompt: string
): Promise<string> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) throw new Error("GROQ_API_KEY is not set. Cannot use fallback AI provider.");

  const response = await fetch(GROQ_URL, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: GROQ_MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt }
      ],
      temperature: 0.7,
      max_tokens: 2000
    })
  });
  
  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    throw new Error(`Groq error: ${err.error?.message || response.statusText}`);
  }
  
  const data = await response.json();
  return data.choices[0].message.content;
}
