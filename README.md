# SaferCircle Backend (Railway-ready)

## Why you saw `degraded: true`
Your backend was using `gemini-1.5-flash`, and Gemini API now reports that model as unavailable for your endpoint/version.

This backend now:
- defaults to `GEMINI_MODEL=gemini-2.5-flash`
- retries with fallback models if configured/default model is not found
- returns `degraded: true` with a safe reply only if all model attempts fail

## CORS behavior
- Always attaches CORS headers.
- Preflight `OPTIONS` returns `204`.
- `CORS_ORIGIN` supports comma-separated origins.

## Required env vars
- `GEMINI_API_KEY` (required)
- `GEMINI_MODEL` (optional, default `gemini-2.5-flash`)
- `PORT` (Railway sets automatically)
- `CORS_ORIGIN` (example: `https://safecircle1.vercel.app`)

## `.env` example
```env
PORT=10000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-2.5-flash
CORS_ORIGIN=https://safecircle1.vercel.app
```

## Endpoints
- `GET /`
- `GET /health`
- `POST /api/chat` (preferred)
- `POST /pause` (legacy alias)

## Success and degraded response shape
Success:
```json
{ "reply": "...", "degraded": false, "model": "gemini-2.5-flash" }
```

Degraded:
```json
{ "reply": "...fallback...", "degraded": true, "error": "...", "triedModels": ["..."] }
```
