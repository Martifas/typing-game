import { MAX_TIME } from "./config.js";
import {
  timerElement,
  wpmElement,
  mistakesElement,
  accuracyElement,
} from "./domElements.js";
import { currentIndex, keydownHandler, fullText } from "./main.js";
import { mistakeCount } from "./handlers.js";

export const startTimer = () => {
  let timeLeft = 60;
  timerInterval(timeLeft);
};

const timerInterval = (timeLeft) => {
  const intervalId = setInterval(() => {
    timeLeft--;
    wpmElement.innerText = calculateWPM(timeLeft);
    accuracyElement.innerText = calculateAccuracy();
    timerElement.innerText = timeLeft;
    defineEnd(timeLeft, intervalId);
  }, 1000);
};

const defineEnd = (timeLeft, intervalId) => {
  if (timeLeft <= 0 || currentIndex >= fullText.length) {
    clearInterval(intervalId);
    endGame();
  }
};

export const updateMistakes = () => (mistakesElement.innerText = mistakeCount);

const calculateWPM = (timeLeft) => {
  const elapsedTime = (MAX_TIME - timeLeft) / 60;
  const correctlyTypedWords = (currentIndex - mistakeCount) / 5;
  return Math.round(correctlyTypedWords / elapsedTime) || 0;
};

const calculateAccuracy = () =>
  Math.round(((currentIndex - mistakeCount) / currentIndex) * 100);

export function endGame() {
  document.removeEventListener("keydown", keydownHandler);
  console.log("DONE, gratz!");
}
