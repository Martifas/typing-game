import { goBackLetter, greenOrRed, highlightLetter } from "./textHandlers.js";
import { startTimer, stopTimer } from "./metricsHandlers.js";
import {
  accuracyElement,
  mistakesElement,
  timerElement,
  wpmElement,
} from "./globals/domElements.js";
import {
  isGameActive,
  fullText,
  spans,
  currentIndex,
  setCurrentIndex,
  setMistakeCount,
} from "./global/states.js";

export function keydownHandler(event) {
  if (!isGameActive) return;
  event.preventDefault();
  if (event.key === "Backspace") {
    goBackLetter(spans, currentIndex);
    setCurrentIndex(Math.max(0, currentIndex - 1));
  } else if (event.key === "Enter") {
    restartPage();
  } else if (event.key === "Escape") {
    resetCurrentText();
  } else if (event.key.length === 1) {
    greenOrRed(fullText, spans, currentIndex, event.key);
    highlightLetter(spans, currentIndex);
    setCurrentIndex(Math.min(fullText.length, currentIndex + 1));
  }
  highlightLetter(spans, currentIndex);
}

export function restartPage() {
  location.reload();
}

export function resetCurrentText() {
  setMistakeCount(0);
  setCurrentIndex(0);

  spans.forEach((span) => {
    span.style.color = "black";
    span.style.textDecoration = "none";
    span.style.fontWeight = "normal";
  });

  timerElement.innerText = 60;
  wpmElement.innerText = 0;
  mistakesElement.innerText = 0;
  accuracyElement.innerText = 100;

  highlightLetter(spans, 0);

  stopTimer();
  startTimer();
}
