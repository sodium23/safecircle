# SaferCircle FastAPI Backend

A clean, backend-only FastAPI service.

---

## 🚀 What works

- `GET /` → service status (JSON for API, HTML for browser)
- `GET /health` → healthcheck
- `GET /scenario/today` → rotating scenario of the day
- `POST /pause` → legacy endpoint for chat fallback

---

## 🌐 CORS Setup (Vercel + Local)

Set `CORS_ORIGIN` as comma-separated origins:

```env
CORS_ORIGIN=https://safecircle1.vercel.app,http://localhost:3000,http://localhost:5500