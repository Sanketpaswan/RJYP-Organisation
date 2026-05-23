import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Initialize Express
const app = express();
const PORT = 3000;

// Middleware for parsing JSON
app.use(express.json());

// Initialize Gemini SDK with telemetry header
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      "User-Agent": "aistudio-build",
    },
  },
});

// AI Endpoint to verify claims & propaganda (RYJP Truth Engine)
app.post("/api/verify-truth", async (req: express.Request, res: express.Response) => {
  try {
    const { claim } = req.body;
    if (!claim || typeof claim !== "string" || !claim.trim()) {
       res.status(400).json({ error: "Please provide a valid claim to analyze." });
       return;
    }

    const systemInstruction = `
      You are the "RYJP Truth Engine" (Rashtriya Yuva Jan Shakti Party's AI Fact Checker). Your purpose is to unmask fake narratives, clickbait, and propaganda, especially regarding news, messages, and social media forwards related to India, national development, youth welfare, policies, economics, and general security.
      Acknowledge current context (current year: 2026).
      Analyze the input text and return a clear fact-checking analysis in JSON format.
      Be objective, precise, and state clear facts with references where possible.
    `;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Perform a detailed political, socio-economic, and factual verification for this statement or social media message: "${claim}"`,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["verdict", "explanation", "ratingPercentage", "keyFacts", "propagandaSpotted", "sourcesSuggested"],
          properties: {
            verdict: {
              type: Type.STRING,
              description: "The official truth assessment level. Must be exactly one of: 'TRUE', 'PARTIALLY_TRUE', 'MISLEADING', 'FALSE'",
            },
            explanation: {
              type: Type.STRING,
              description: "A solid, professional, human-readable paragraph summarizing why this verdict was reached.",
            },
            ratingPercentage: {
              type: Type.INTEGER,
              description: "An integer truth percentage from 0 (entirely fabrication) to 100 (fully verified factual standard).",
            },
            keyFacts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A bulleted list of 2-4 verified key factual points related to the statement.",
            },
            propagandaSpotted: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of specific manipulation techniques spotted (e.g. fear-mongering, altered context, cherry-picked data, out-of-context quote, None).",
            },
            sourcesSuggested: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: "A list of suggested high-quality resources, government portals, or official channels to query for this context.",
            }
          },
        },
      },
    });

    const parsedData = JSON.parse(response.text?.trim() || "{}");
    res.json({ success: true, data: parsedData });
  } catch (error: any) {
    console.error("Gemini API Error in /api/verify-truth:", error);
    res.status(500).json({
      success: false,
      error: error.message || "Something went wrong while verifying this statement."
    });
  }
});

// Policy / Vision Explorer AI endpoint (RYJP Jan-Shakti Chatbot)
app.post("/api/ask-policy", async (req: express.Request, res: express.Response) => {
  try {
    const { question, history } = req.body;
    if (!question || typeof question !== "string") {
      res.status(400).json({ error: "Please provide a query." });
      return;
    }

    const systemInstruction = `
      You are "Jan-Shakti Chatbot", the AI ambassador of the Rashtriya Yuva Jan Shakti Party (RYJP).
      Your core guidelines are:
      1. Represent RYJP's political values: Youth Empowerment, Truth over Propaganda, Nation First, and People-Powered Development.
      2. Promote unity, progress, education, employment, national security, circular economy, and transparency.
      3. Your tone is patriotic, inspiring, forward-looking, respectful, and fact-focused.
      4. Speak proudly about RYJP's key initiatives: Youth March For Truth, National Youth Convention 2024, Unmasking Fake Narratives Campaign, and expanding to over 10+ states.
      5. Answer queries in an easy-to-read markdown format. Be concise. Keep responses under 150 words.
    `;

    const chatHistory = history || [];
    const formattedContents = chatHistory.map((msg: any) => ({
      role: msg.role === "user" ? "user" : "model",
      parts: [{ text: msg.text }]
    }));

    // Append the new message
    formattedContents.push({
      role: "user",
      parts: [{ text: question }]
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: formattedContents,
      config: {
        systemInstruction,
      }
    });

    res.json({ success: true, reply: response.text });
  } catch (error: any) {
    console.error("Error in /api/ask-policy:", error);
    res.status(500).json({ success: false, error: error.message });
  }
});

// Setup Vite Dev server or static files production build
async function bootstrap() {
  if (process.env.NODE_ENV !== "production") {
    console.log("Setting up Vite middleware for development...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    console.log("Serving compiled static files from dist...");
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`RYJP Portal running on http://localhost:${PORT}`);
  });
}

bootstrap();
