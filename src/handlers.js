import { textContainer, timerElement } from "./domElements.js";

export async function generateText() {
  try {
    const response = await fetch(
      "https://random-word-form.herokuapp.com/random/noun/?count=30"
    );
    const text = await response.text();
    let parseText = parseFetchedText(text);
    textContainer.innerText = parseText.join(" ");
  } catch (error) {
    console.log("Error getting text:", error);
  }
}

function parseFetchedText(text) {
  return JSON.parse(text);
}

export function startTimer() {
  let timeLeft = 60;

  let timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;

    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      console.log("Time's up!");
    }
  }, 1000);
}
