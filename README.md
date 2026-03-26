# SaferCircle FastAPI Backend

This repo is backend-only and deploys with Python/FastAPI.

## Why build was failing
Railway/Nixpacks was auto-running `npm install` because JavaScript frontend files were present.
This repo now forces Python-only build via `nixpacks.toml`.

## Run locally
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --reload
```

## Endpoints
- `GET /health`
- `GET /scenario/today`

## Scenario rotation
`/scenario/today` returns one hardcoded scenario rotated by:
- `index = today.day % len(SCENARIOS)`

## CORS (localhost frontend)
Enabled for:
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:8080`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:8080`

## Railway start
Start command is also provided in:
- `Procfile`
- `nixpacks.toml`
