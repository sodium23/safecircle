const path = require("path");
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-1.5-flash";

app.use(
  cors({
    origin: process.env.CORS_ORIGIN ? process.env.CORS_ORIGIN.split(",") : "*",
  })
);
app.use(express.json({ limit: "1mb" }));
app.use(express.static(path.join(__dirname)));

const systemPrompt = `You are a tough older sister safety coach.
Rules:
- Be direct, strategic, and no sugarcoating.
- Give 2-3 practical options.
- Explain likely consequences for each option.
- Keep it concise and focused on personal safety.`;

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "safecircle-backend", model: GEMINI_MODEL });
});

app.post("/api/chat", async (req, res) => {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Server is missing GEMINI_API_KEY." });
    }

    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Request body must include a non-empty 'message' string." });
    }

    const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent?key=${GEMINI_API_KEY}`;
    const payload = {
      contents: [
        {
          role: "user",
          parts: [{ text: `${systemPrompt}\n\nUser situation: ${message.trim()}` }],
        },
      ],
    };

    const response = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await response.json().catch(() => ({}));
    if (!response.ok) {
      const errorMessage = data?.error?.message || "Gemini request failed.";
      return res.status(502).json({ error: errorMessage });
    }

    const text =
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response text returned. Try again.";

    return res.json({ reply: text });
  } catch (error) {
    return res.status(500).json({ error: error.message || "Unexpected server error." });
  }
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`SaferCircle backend running on port ${PORT}`);
});
