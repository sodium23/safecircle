# SaferCircle FastAPI Backend

<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9
A clean, backend-only FastAPI service.

## What works
- `GET /` → basic service status (JSON for API clients, HTML for browser navigation)
- `GET /health` → healthcheck
- `GET /scenario/today` → rotating scenario of the day
- `POST /pause` → legacy compatibility endpoint used by old frontend builds

## CORS fix for Vercel
Set `CORS_ORIGIN` as comma-separated origins, for example:

```env
CORS_ORIGIN=https://safecircle1.vercel.app,http://localhost:3000
```
=======
## Build fix (once and for all)
Build now uses a **Dockerfile** so Railway will not run npm or mixed-language autodetection.
>>>>>>> main

## Local run
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Docker deploy (Railway)
This repo deploys using `Dockerfile` + `railway.json`.
No npm/node steps are required.
=======
uvicorn app.main:app --reload
```

## Deploy
Railway is configured to use Dockerfile via `railway.json`.

## Endpoints
- `GET /health`
- `GET /scenario/today`

## Conflict helpers
- `bash scripts/override_conflicts.sh ours`
- `bash scripts/override_conflicts.sh theirs`
- `bash scripts/resolve_conflicts_backend_only.sh`
>>>>>>> main
