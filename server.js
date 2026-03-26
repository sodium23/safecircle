const express = require("express");
const dotenv = require("dotenv");

dotenv.config();

const app = express();
const PORT = process.env.PORT || 10000;
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL || "gemini-2.5-flash";

function normalizeOrigin(value) {
  return value.trim().replace(/\/$/, "");
}

const rawCorsOrigin = process.env.CORS_ORIGIN || "*";
const allowedOrigins = rawCorsOrigin
  .split(",")
  .map(normalizeOrigin)
  .filter(Boolean);

function resolveAllowOrigin(requestOrigin) {
  if (allowedOrigins.includes("*")) {
    return "*";
  }

  if (!requestOrigin) {
    return allowedOrigins[0] || "*";
  }

  const normalizedOrigin = normalizeOrigin(requestOrigin);
  if (allowedOrigins.includes(normalizedOrigin)) {
    return requestOrigin;
  }

  return allowedOrigins[0] || "*";
}

app.use((req, res, next) => {
  const allowOrigin = resolveAllowOrigin(req.headers.origin);
  res.header("Access-Control-Allow-Origin", allowOrigin);
  res.header("Vary", "Origin");
  res.header("Access-Control-Allow-Methods", "GET,POST,OPTIONS");
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization");

  if (req.method === "OPTIONS") {
    return res.sendStatus(204);
  }

  return next();
});

app.use(express.json({ limit: "1mb" }));

const systemPrompt = `You are a tough older sister safety coach.
Rules:
- Be direct, strategic, and no sugarcoating.
- Give 2-3 practical options.
- Explain likely consequences for each option.
- Keep it concise and focused on personal safety.`;

const fallbackReply =
  "I can’t reach live AI right now. Stay in public, call someone you trust, and move to a staffed location immediately.";

const modelCandidates = [
  GEMINI_MODEL,
  "gemini-2.5-flash",
  "gemini-2.0-flash",
  "gemini-flash-latest",
].filter((model, index, arr) => model && arr.indexOf(model) === index);

app.get("/", (_req, res) => {
  res.json({ service: "safecircle-backend", status: "ok" });
});

app.get("/health", (_req, res) => {
  res.json({ status: "ok", service: "safecircle-backend", model: GEMINI_MODEL });
});

async function callGeminiWithModel(message, modelName) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${modelName}:generateContent?key=${GEMINI_API_KEY}`;
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
  return { response, data, modelName };
}

function isModelNotFoundError(data) {
  const message = data?.error?.message || "";
  return message.includes("is not found") || message.includes("not supported for generateContent");
}

async function handleChat(req, res) {
  try {
    if (!GEMINI_API_KEY) {
      return res.status(500).json({ error: "Server is missing GEMINI_API_KEY." });
    }

    const { message } = req.body || {};
    if (!message || typeof message !== "string") {
      return res.status(400).json({ error: "Request body must include a non-empty 'message' string." });
    }

    let lastFailure = null;

    for (const modelName of modelCandidates) {
      const { response, data } = await callGeminiWithModel(message, modelName);

      if (response.ok) {
        const text =
          data?.candidates?.[0]?.content?.parts?.[0]?.text ||
          "No response text returned. Try again.";
        return res.json({ reply: text, degraded: false, model: modelName });
      }

      lastFailure = { data, modelName };
      if (!isModelNotFoundError(data)) {
        break;
      }
    }

    return res.status(200).json({
      reply: fallbackReply,
      degraded: true,
      error: lastFailure?.data?.error?.message || "Gemini request failed.",
      triedModels: modelCandidates,
    });
  } catch (error) {
    return res.status(200).json({ reply: fallbackReply, degraded: true, error: error.message });
  }
}

app.post("/api/chat", handleChat);
app.post("/pause", handleChat);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`SaferCircle backend running on port ${PORT}`);
});
