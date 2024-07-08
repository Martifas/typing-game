import { textContainer, timerElement } from "./domElements.js";

export async function generateText() {
  try {
    const response = await fetch(
      "https://random-word-form.herokuapp.com/random/noun/?count=30"
    );
    const text = await response.text();
    let parseText = parseFetchedText(text);
    let fullText = parseText.join(" ");
    textContainer.innerHTML = fullText.split('').map(char => `<span>${char}</span>`).join('');
    return fullText;
  } catch (error) {
    console.log("Error getting text:", error);
    return '';
  }
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

function parseFetchedText(text) {
  return JSON.parse(text);
}

let currentLetterIndex = 0;

export function highlightLetter(fullText) {
  if (currentLetterIndex > 0) {
    textContainer.children[currentLetterIndex - 1].style.textDecoration = "none";
  }
  if (currentLetterIndex < fullText.length) {
    textContainer.children[currentLetterIndex].style.textDecoration = "underline";
    currentLetterIndex++;
  }
}