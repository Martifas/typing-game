import { MAX_TIME, ACCEPTABLE_WORD_LENGTH } from "./config.js";
import {
  timerElement,
  wpmElement,
  mistakesElement,
  accuracyElement,
} from "./domElements.js";
import { currentIndex, endGame, fullText } from "./main.js";
import { mistakeCount } from "./textHandlers.js";

export let timeLeft = 60;
let intervalId;

export const startTimer = () => {
  stopTimer();
  timeLeft = 60;
  timerElement.innerText = timeLeft;
  intervalId = setInterval(() => {
    timeLeft--;
    wpmElement.innerText = calculateWPM(timeLeft);
    accuracyElement.innerText = calculateAccuracy();
    timerElement.innerText = timeLeft;
    defineEnd(timeLeft, intervalId);
  }, 1000);
};

export const stopTimer = () => {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
};

const defineEnd = (timeLeft, intervalId) => {
  if (timeLeft <= 0 || currentIndex >= fullText.length) {
    clearInterval(intervalId);
    endGame();
  }
};

export const updateMistakes = () => (mistakesElement.innerText = mistakeCount);

export const calculateWPM = (timeLeft) => {
  const elapsedTime = (MAX_TIME - timeLeft) / 60;
  const correctlyTypedWords =
    (currentIndex - mistakeCount) / ACCEPTABLE_WORD_LENGTH;
  return Math.round(correctlyTypedWords / elapsedTime) || 0;
};

export const calculateAccuracy = () => {
  if (currentIndex === 0) return 100;
  const correctEntries = currentIndex - mistakeCount;
  if (correctEntries === 0) return 0;
  return Math.round((correctEntries / currentIndex) * 100);
};
