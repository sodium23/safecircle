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


## Conflict too complex? (quick fix)
If Git says conflict resolution is too complex and you want to keep this backend-only FastAPI version:

```bash
bash scripts/resolve_conflicts_backend_only.sh
```

What it does:
- keeps **current branch** version for all conflicted files (`--ours`)
- stages everything
- creates a resolution commit


## How to override conflicts quickly
If merge conflicts are too complex, force one side:

Keep your current branch version (**ours**):
```bash
bash scripts/override_conflicts.sh ours
```

Keep incoming branch version (**theirs**):
```bash
bash scripts/override_conflicts.sh theirs
```

Manual one-liner alternative:
```bash
git checkout --ours . && git add -A && git commit -m "Resolve conflicts (ours)"
```


## Build-failed fix (Railway)
This repo now includes **both**:
- `nixpacks.toml` with explicit Python-only phases
- `railway.json` with explicit FastAPI start command

So Railway won't try Node/npm build steps.
