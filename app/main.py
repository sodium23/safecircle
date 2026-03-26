import os
from typing import List

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from app.scenarios import get_today_scenario

app = FastAPI(title="SaferCircle API", version="1.0.0")


# ---------------------------
# CORS CONFIG
# ---------------------------

def _build_allowed_origins() -> List[str]:
    raw = os.getenv("CORS_ORIGIN", "").strip()
    if raw:
        return [origin.strip().rstrip("/") for origin in raw.split(",") if origin.strip()]

    return [
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:5173",
        "http://127.0.0.1:5173",
        "https://safecircle1.vercel.app",
    ]


app.add_middleware(
    CORSMiddleware,
  allow_origins=[
        "https://safecircle1.vercel.app",
        "http://localhost:3000",
        "http://localhost:5500",
        "http://127.0.0.1:5500",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



# ---------------------------
# MODELS
# ---------------------------

class PauseRequest(BaseModel):
    message: str | None = None


# ---------------------------
# ROUTES
# ---------------------------

@app.get("/")
@app.get("/")
def root():
    return {"status": "ok", "service": "safecircle-backend"}



@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/scenario/today")
def scenario_today():
    return get_today_scenario()


@app.post("/pause")
def pause(payload: PauseRequest):
    context = payload.message.strip() if payload.message else ""

    reply = (
        "Pause. Get to a public, staffed place now. "
        "Call someone you trust, share your live location, and avoid going home alone."
    )

    if context:
        reply = f"{reply}\n\nContext noted: {context[:200]}"

    return {
        "reply": reply,
        "degraded": False,
        "source": "fastapi-fallback",
    }
