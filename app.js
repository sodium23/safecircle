const tabButtons = document.querySelectorAll(".tab-btn");
const screens = document.querySelectorAll(".screen");
const chatInput = document.getElementById("chatInput");
const sendBtn = document.getElementById("sendBtn");
const apiKeyInput = document.getElementById("apiKey");
const chatResponse = document.getElementById("chatResponse");
const optionsContainer = document.getElementById("options");
const scenarioAnswer = document.getElementById("scenarioAnswer");

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

function switchScreen(screenId) {
  tabButtons.forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.screen === screenId);
  });

  screens.forEach((screen) => {
    screen.classList.toggle("active", screen.id === screenId);
  });
}

async function callGeminiAPI(userMessage, apiKey) {
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

  const sisterTonePrompt = `You are a tough older sister safety coach.
Rules:
- Be direct, strategic, and no sugarcoating.
- Give 2-3 practical options.
- Explain likely consequences for each option.
- Keep it concise and focused on personal safety.

User situation: ${userMessage}`;

  const payload = {
    contents: [
      {
        role: "user",
        parts: [{ text: sisterTonePrompt }],
      },
    ],
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || "Gemini request failed.";
    throw new Error(message);
  }

  const data = await response.json();
  return (
    data?.candidates?.[0]?.content?.parts?.[0]?.text ||
    "No response text returned. Check your API key and try again."
  );
}

async function handleSend() {
  const userMessage = chatInput.value.trim();
  const apiKey = apiKeyInput.value.trim();

  if (!userMessage) {
    chatResponse.textContent = "Type the situation first. I can’t work with silence.";
    chatResponse.classList.add("error");
    return;
  }

  if (!apiKey) {
    chatResponse.textContent = "Add your Gemini API key first. No key, no strategy.";
    chatResponse.classList.add("error");
    return;
  }

  chatResponse.textContent = "Thinking...";
  chatResponse.classList.remove("error");

  try {
    const aiText = await callGeminiAPI(userMessage, apiKey);
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
