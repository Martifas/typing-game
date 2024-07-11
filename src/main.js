import { generateText } from "./textHandlers.js";
import { handleKeydownInputs, restartPage } from "./helpers.js";
import { startTimer } from "./metricsHandlers.js";
import { loadTable } from "./resultsTable.js";
import { restartButton } from "../globals/domElements.js";
import {
  isGameActive,
  setFullText,
  setSpans,
  setIsGameActive,
} from "../globals/states.js";

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
  document.addEventListener("keydown", handleKeydownInputs);
  restartButton.addEventListener("click", restartPage);
});
