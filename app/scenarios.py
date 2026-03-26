from fastapi import FastAPI
from app.scenarios import get_today_scenario

app = FastAPI()

@app.get("/scenario/today")
def today_scenario():
    return get_today_scenario()
