# SaferCircle Backend (Railway-ready)

## Backend only
This service is API-only. Frontend should call this backend over HTTPS.

## Why you saw the CORS error
Your frontend called:
- `POST /pause`

But the canonical endpoint is:
- `POST /api/chat`

This backend now supports **both** `/api/chat` and `/pause` so older frontend code still works.

## Where to add your Gemini key
Use environment variables (never hardcode in frontend code):

- Local development: set `GEMINI_API_KEY` in `.env` (copy from `.env.example`).
- Railway: add `GEMINI_API_KEY` in **Project → Service → Variables**.

## CORS setup (fix for Vercel frontend)
Set `CORS_ORIGIN` to your Vercel URL(s), comma-separated if multiple:

```env
CORS_ORIGIN=https://safecircle1.vercel.app,https://www.yourdomain.com
```

Notes:
- Do **not** include path values (only origin).
- Trailing slash is accepted and normalized.
- `CORS_ORIGIN=*` allows all origins (not recommended for production).

## Required environment variables
- `GEMINI_API_KEY` (required)
- `GEMINI_MODEL` (optional, default: `gemini-1.5-flash`)
- `PORT` (Railway injects this automatically)
- `CORS_ORIGIN` (set to your frontend domain in production)

## Local run
```bash
npm install
cp .env.example .env
npm start
```

## API
### `POST /api/chat` (preferred)
Request:
```json
{ "message": "Someone is following me near my apartment." }
```

Response:
```json
{ "reply": "...AI safety guidance..." }
```

### `POST /pause` (legacy alias)
Same request/response as `/api/chat`.

### `GET /health`
Returns service health.
