# SaferCircle Backend (Railway-ready)

## Backend only
This service is API-only. Frontend should call this backend over HTTPS.

## Where to add your Gemini key
Use environment variables (never hardcode in frontend code):

- Local development: set `GEMINI_API_KEY` in `.env` (copy from `.env.example`).
- Railway: add `GEMINI_API_KEY` in **Project → Service → Variables**.

## CORS setup (fix for Vercel frontend)
Set `CORS_ORIGIN` to your Vercel URL(s), comma-separated if multiple:

```env
CORS_ORIGIN=https://your-app.vercel.app,https://www.yourdomain.com
```

If you set `CORS_ORIGIN=*`, all origins are allowed (not recommended for production).

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
### `POST /api/chat`
Request:
```json
{ "message": "Someone is following me near my apartment." }
```

Response:
```json
{ "reply": "...AI safety guidance..." }
```

### `GET /health`
Returns service health.

## Deploy on Railway
1. Push this repo to GitHub.
2. In Railway, create a new project from your GitHub repo.
3. Railway auto-detects Node and runs `npm start`.
4. Open **Variables** and set:
   - `GEMINI_API_KEY=your_real_key`
   - `CORS_ORIGIN=https://your-app.vercel.app`
   - optional `GEMINI_MODEL=gemini-1.5-flash`
5. Redeploy service.
