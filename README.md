# SaferCircle FastAPI Backend

A clean, backend-only FastAPI service.

## What works
- `GET /` → basic service status
- `GET /health` → healthcheck
- `GET /scenario/today` → rotating scenario of the day

## Local run (verified)
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
uvicorn app.main:app --host 0.0.0.0 --port 8000
```

## Docker deploy (Railway)
This repo deploys using `Dockerfile` + `railway.json`.
No npm/node steps are required.

## Notes
- Scenario rotation uses: `date.today().day % len(SCENARIOS)`
- CORS is enabled for localhost frontend ports 3000/5173/8080.
