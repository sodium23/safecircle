# SaferCircle Backend (Railway-ready)

## Why you saw this error
Browser error showed:
- request to `/pause`
- CORS blocked
- `503 Service Unavailable`

That usually means Railway returned an error page before your app response reached the browser.
This backend now always sends CORS headers and supports both `/api/chat` and `/pause`.

## CORS behavior now
- CORS headers are always attached.
- Preflight `OPTIONS` always returns `204`.
- `CORS_ORIGIN` supports comma-separated origins.
- If a request origin is not in list, backend falls back to the first configured origin.

## Required env vars
- `GEMINI_API_KEY` (required)
- `GEMINI_MODEL` (optional, default `gemini-1.5-flash`)
- `PORT` (Railway sets automatically)
- `CORS_ORIGIN` (example: `https://safecircle1.vercel.app`)

## `.env` example
```env
PORT=10000
GEMINI_API_KEY=your_gemini_api_key_here
GEMINI_MODEL=gemini-1.5-flash
CORS_ORIGIN=https://safecircle1.vercel.app
```

## Endpoints
- `GET /`
- `GET /health`
- `POST /api/chat` (preferred)
- `POST /pause` (legacy alias)

## Degraded mode
If Gemini is temporarily unavailable, API returns HTTP 200 with:
- `degraded: true`
- `reply` fallback safety guidance
- `error` with upstream issue

This prevents frontend hard failures during transient provider outages.
