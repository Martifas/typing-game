import { mistakesElement } from "./domElements.js";
import {
  generateText,
  greenOrRed,
  highlightLetter,
  startTimer,
  goBackLetter,
} from "./handlers.js";

document.addEventListener("DOMContentLoaded", async () => {
  let { fullText, spans } = await generateText();
  let currentIndex = 0;

  document.addEventListener("keydown", startTimer, { once: true });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Backspace") {
      goBackLetter(spans, currentIndex);
      currentIndex = Math.max(0, currentIndex - 1);
    } else if (event.key.length === 1) {
      greenOrRed(fullText, spans, currentIndex, event.key);
      currentIndex = Math.min(fullText.length, currentIndex + 1);
    }
    highlightLetter(spans, currentIndex);

    mistakesElement.innerText = countMistakes(spans);
  });

  highlightLetter(spans, currentIndex);
});
