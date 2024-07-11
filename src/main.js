import { generateText } from "./textHandlers.js";
import { keydownHandler, restartPage } from "./helpers.js";
import { startTimer } from "./metricsHandlers.js";
import { loadTable } from "./resultsTable.js";
import { restartButton } from "./domElements.js";
import {
  isGameActive,
  setFullText,
  setSpans,
  setIsGameActive,
} from "./globals.js";

document.addEventListener("DOMContentLoaded", async () => {
  loadTable();
  const textData = await generateText();
  setFullText(textData.fullText);
  setSpans(textData.spans);
  document.addEventListener(
    "keydown",
    () => {
      if (!isGameActive) {
        setIsGameActive(true);
        startTimer();
      }
    },
    { once: true }
  );
  document.addEventListener("keydown", keydownHandler);
  restartButton.addEventListener("click", restartPage);
});
