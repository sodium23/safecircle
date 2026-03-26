# SaferCircle (Render-ready backend + mobile-friendly API)

## What this includes
- Express backend for Render deployment.
- `POST /api/chat` endpoint for web/mobile clients.
- Static frontend served from the same app.

## Local run
```bash
npm install
cp .env.example .env
npm start
```

Backend URL: `http://localhost:10000`

## API
### `POST /api/chat`
Request body:
```json
{
  "message": "Someone is following me near my apartment."
}
```

Response body:
```json
{
  "reply": "...AI safety guidance..."
}
```

## Render deploy
1. Push repo to GitHub.
2. Create a new Render Web Service.
3. Render can read `render.yaml` automatically.
4. Set `GEMINI_API_KEY` in Render environment variables.
5. Deploy.

## Mobile app compatibility notes
- Endpoint is plain JSON over HTTPS, suitable for React Native / Flutter / Swift / Kotlin.
- CORS is configurable with `CORS_ORIGIN`.
- Client can point to Render URL using the optional backend URL field.
