from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

print("🚀 APP STARTING...")

app = FastAPI()

# CORS (open for now — we’ll tighten later)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ---------------------------
# DATA
# ---------------------------

SCENARIOS = [
    {
        "id": 1,
        "situation": "You’re in a meeting and someone keeps interrupting you.",
        "choices": [
            {"id": "A", "text": "Stay quiet"},
            {"id": "B", "text": "Talk louder"},
            {"id": "C", "text": "Say 'Let me finish'"}
        ],
        "outcomes": {
            "A": "You disappear long term.",
            "B": "Comes off reactive and loses control.",
            "C": "Shows authority without drama."
        },
        "power_move": "Say calmly: 'Let me finish' and continue."
    },
    {
        "id": 2,
        "situation": "A stranger is following you at night.",
        "choices": [
            {"id": "A", "text": "Ignore and keep walking"},
            {"id": "B", "text": "Run immediately"},
            {"id": "C", "text": "Enter a public place and call someone"}
        ],
        "outcomes": {
            "A": "Risk increases.",
            "B": "May escalate panic.",
            "C": "Safest option. You gain visibility and safety."
        },
        "power_move": "Walk into a store/hotel and call for help."
    }
]

def get_today_scenario():
    index = datetime.now().day % len(SCENARIOS)
    return SCENARIOS[index]

# ---------------------------
# ROUTES
# ---------------------------

@app.get("/")
def root():
    return {"status": "ok"}

@app.get("/ping")
def ping():
    return {"ping": "pong"}

@app.get("/scenario/today")
def scenario_today():
    return get_today_scenario()

@app.post("/pause")
def pause():
    return {
        "reply": "Pause. Move to a safe, public place and call someone you trust.",
        "degraded": False
    }
