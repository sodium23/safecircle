const tabButtons = document.querySelectorAll(".tab-btn");
const screens = document.querySelectorAll(".screen");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const apiBaseInput = document.getElementById("apiBaseUrl");
const chatResponse = document.getElementById("chatResponse");
const optionsContainer = document.getElementById("options");
const scenarioAnswer = document.getElementById("scenarioAnswer");
from fastapi.middleware.cors import CORSMiddleware

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://safecircle1.vercel.app"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

const scenario = {
  text: "You’re at a party. A guy keeps isolating your friend and blocking her from leaving the room.",
  options: [
    {
      label: "Confront him loudly in front of everyone.",
      answer:
        "Direct, but risky. If he escalates, your friend is still trapped. Better: get your friend physically out first, then call him out with backup.",
    },
    {
      label: "Ignore it and assume she can handle herself.",
      answer:
        "Bad move. Silence helps predators. Consequence: she feels abandoned and danger grows. Check in and create an exit now.",
    },
    {
      label: "Pull your friend away with a clear excuse and leave together.",
      answer:
        "Best tactical choice. You reduce immediate risk, create distance, and regain control. Safety first, drama second.",
    },
  ],
};

from fastapi import FastAPI
from app.scenarios import get_today_scenario

app = FastAPI()

@app.get("/scenario/today")
def today_scenario():
    return get_today_scenario()

function switchScreen(screenId) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
}

function getApiBase() {
  return apiBaseInput.value.trim().replace(/\/$/, "");
}

async function getSafetyGuidance(userMessage) {
  const apiBase = getApiBase();
  const endpoint = `${apiBase}/api/chat`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message: userMessage }),
  });

  const data = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(data?.error || "Backend request failed.");
  }

  return data?.reply || "No response text returned. Try again.";
}

async function handleSend() {
  const userMessage = chatInput.value.trim();

  if (!userMessage) {
    chatResponse.textContent = "Type the situation first. I can’t work with silence.";
    chatResponse.classList.add("error");
    return;
  }

  chatResponse.textContent = "Thinking...";
  chatResponse.classList.remove("error");

  try {
    const aiText = await getSafetyGuidance(userMessage);
    chatResponse.textContent = aiText;
  } catch (error) {
    chatResponse.textContent = `Problem: ${error.message}`;
    chatResponse.classList.add("error");
  }
}

function renderScenario() {
  document.getElementById("scenarioText").textContent = scenario.text;
  optionsContainer.innerHTML = "";

  scenario.options.forEach((option) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "option-btn";
    button.textContent = option.label;
    button.addEventListener("click", () => {
      scenarioAnswer.textContent = option.answer;
      scenarioAnswer.classList.remove("error");
    });
    optionsContainer.appendChild(button);
  });
}

tabButtons.forEach((button) => {
  button.addEventListener("click", () => switchScreen(button.dataset.screen));
});

sendBtn.addEventListener("click", handleSend);
chatInput.addEventListener("keydown", (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key === "Enter") {
    handleSend();
  }
});

renderScenario();
