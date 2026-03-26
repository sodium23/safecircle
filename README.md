# SaferCircle Backend (Railway-ready)

## Why you still saw `degraded: true`
If Railway env still has `GEMINI_MODEL=gemini-1.5-flash`, backend can fail if that model is retired.

This backend now:
- defaults to `gemini-2.5-flash`
- dynamically calls `ListModels` and retries models that support `generateContent`
- caches discovered models for 10 minutes to reduce API overhead

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
