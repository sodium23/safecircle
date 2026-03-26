# SaferCircle FastAPI Backend

A clean, backend-only FastAPI service.

## What works
- `GET /` → basic service status
- `GET /health` → healthcheck
- `GET /scenario/today` → rotating scenario of the day
- `POST /pause` → legacy compatibility endpoint used by old frontend builds

## CORS fix for Vercel
Set `CORS_ORIGIN` as comma-separated origins, for example:

```env
CORS_ORIGIN=https://safecircle1.vercel.app,http://localhost:3000
```

## Local run
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Docker deploy (Railway)
This repo deploys using `Dockerfile` + `railway.json`.
No npm/node steps are required.
