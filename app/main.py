from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import HTMLResponse
from pydantic import BaseModel

from app.scenarios import get_today_scenario

app = FastAPI(title="SaferCircle API", version="1.0.0")

# CORS middleware must be registered before routes.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5500",
        "http://127.0.0.1:5500",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


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
    return {"status": "ok"}


@app.get("/scenario/today")
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
