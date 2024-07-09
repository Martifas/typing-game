import {
  generateText,
  greenOrRed,
  highlightLetter,
  goBackLetter,
} from "./handlers.js";

import { startTimer, endGame } from "./metricsHandlers.js";

export let currentIndex = 0;
export let fullText = "";
let isGameActive = false;
let spans = [];


document.addEventListener("DOMContentLoaded", async () => {
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

  highlightLetter(spans, currentIndex);
});

export const keydownHandler = (event) => {
  if (!isGameActive) return;
  event.preventDefault();
  if (event.key === "Backspace") {
    goBackLetter(spans, currentIndex);
    currentIndex = Math.max(0, currentIndex - 1);
  } else if (event.key.length === 1) {
    greenOrRed(fullText, spans, currentIndex, event.key);
    currentIndex = Math.min(fullText.length, currentIndex + 1);
  }
  highlightLetter(spans, currentIndex);
};
