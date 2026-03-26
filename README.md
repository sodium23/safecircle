# SaferCircle FastAPI Backend

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

## Scenario endpoint
`/scenario/today` returns one hardcoded scenario rotated by current day-of-month:
- index = `today.day % len(SCENARIOS)`

Each scenario includes:
- `id`
- `situation`
- `choices` (A/B/C)
- `outcomes` (mapped by A/B/C)
- `power_move`

## CORS
CORS is enabled for localhost frontend origins:
- `http://localhost:3000`
- `http://localhost:5173`
- `http://localhost:8080`
- `http://127.0.0.1:3000`
- `http://127.0.0.1:5173`
- `http://127.0.0.1:8080`
