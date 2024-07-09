import {
  generateText,
  greenOrRed,
  highlightLetter,
  goBackLetter,
  resetCurrentText,
} from "./textHandlers.js";

import { startTimer } from "./metricsHandlers.js";
import { loadTable, printResults } from "./resultsTable.js";
import { restartButton } from "./domElements.js";

export let currentIndex = 0;
export let fullText = "";
let isGameActive = false;
export let spans = [];

document.addEventListener("DOMContentLoaded", async () => {
  loadTable();
  const textData = await generateText();
  fullText = textData.fullText;
  spans = textData.spans;

  document.addEventListener(
    "keydown",
    () => {
      if (!isGameActive) {
        isGameActive = true;
        startTimer();
      }
    },
    { once: true }
  );

  document.addEventListener("keydown", keydownHandler);
  restartButton.addEventListener("click", restartPage);
});

const keydownHandler = (event) => {
  if (!isGameActive) return;
  event.preventDefault();
  if (event.key === "Backspace") {
    goBackLetter(spans, currentIndex);
    currentIndex = Math.max(0, currentIndex - 1);
  } else if (event.key === "Enter") {
    restartPage();
  } else if (event.key === "Escape") {
    resetCurrentText();
  } else if (event.key.length === 1) {
    greenOrRed(fullText, spans, currentIndex, event.key);
    highlightLetter(spans, currentIndex);
    currentIndex = Math.min(fullText.length, currentIndex + 1);
  }
  highlightLetter(spans, currentIndex);
};

export const endGame = () => {
  printResults();
};

function restartPage() {
  location.reload();
}

export function setCurrentIndex(value) {
  currentIndex = value;
}
