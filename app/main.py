<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9
import os
from typing import List

from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel
=======
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
>>>>>>> main

from app.scenarios import get_today_scenario

app = FastAPI(title="SaferCircle API", version="1.0.0")

<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9

def _build_allowed_origins() -> List[str]:
    raw = os.getenv("CORS_ORIGIN", "").strip()
    if raw:
        return [origin.strip().rstrip("/") for origin in raw.split(",") if origin.strip()]

    return [
=======
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
>>>>>>> main
        "http://localhost:3000",
        "http://localhost:5173",
        "http://localhost:8080",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
        "http://127.0.0.1:8080",
<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9
        "https://safecircle1.vercel.app",
    ]


app.add_middleware(
    CORSMiddleware,
    allow_origins=_build_allowed_origins(),
=======
    ],
>>>>>>> main
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9
class PauseRequest(BaseModel):
    message: str | None = None


@app.get("/")
def root(request: Request):
    accept = (request.headers.get("accept") or "").lower()
    if "text/html" in accept:
        return HTMLResponse(
            """
            <html>
              <head><title>SaferCircle Backend</title></head>
              <body>
                <h1>SaferCircle Backend is running</h1>
                <ul>
                  <li><a href=\"/health\">/health</a></li>
                  <li><a href=\"/scenario/today\">/scenario/today</a></li>
                </ul>
              </body>
            </html>
            """
        )

    return {"service": "safecircle-backend", "status": "ok"}


@app.get("/health")
def health() -> dict[str, str]:
=======
@app.get("/health")
def health():
>>>>>>> main
    return {"status": "ok"}


@app.get("/scenario/today")
<<<<<<< codex/create-mobile-compatible-backend-code-for-render-2ov9l9
def scenario_today() -> dict:
    return get_today_scenario()


@app.post("/pause")
def pause(payload: PauseRequest) -> dict[str, object]:
    context = payload.message.strip() if payload.message else ""
    reply = (
        "Pause. Get to a public, staffed place now. "
        "Call someone you trust, share your live location, and avoid going home alone."
    )
    if context:
        reply = f"{reply}\n\nContext noted: {context[:200]}"

    return {"reply": reply, "degraded": False, "source": "fastapi-fallback"}
=======
def scenario_today():
    return get_today_scenario()
>>>>>>> main
