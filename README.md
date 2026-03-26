# SaferCircle FastAPI Backend

## Build fix (once and for all)
Build now uses a **Dockerfile** so Railway will not run npm or mixed-language autodetection.

## Local run
```bash
python -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
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
