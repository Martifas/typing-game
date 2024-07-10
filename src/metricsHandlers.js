import { MAX_TIME, ACCEPTABLE_WORD_LENGTH } from "./config.js";
import {
  timerElement,
  wpmElement,
  mistakesElement,
  accuracyElement,
} from "./domElements.js";
import { currentIndex, endGame, fullText } from "./main.js";
import { getPreviousWPM } from "./resultsTable.js";
import { mistakeCount } from "./textHandlers.js";

export let timeLeft = MAX_TIME;
let intervalId;

export const startTimer = () => {
  stopTimer();
  timeLeft = MAX_TIME;
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

export function calculateWPM(timeLeft) {
  const elapsedTime = (MAX_TIME - timeLeft) / 60;
  const correctlyTypedWords =
    (currentIndex - mistakeCount) / ACCEPTABLE_WORD_LENGTH;
  return Math.round(correctlyTypedWords / elapsedTime) || 0;
}

export function calculateAccuracy() {
  if (currentIndex === 0) return 100;
  const correctEntries = currentIndex - mistakeCount;
  return correctEntries === 0
    ? 0
    : Math.round((correctEntries / currentIndex) * 100);
}

export function calculatePerformance() {
  const previousWpm = getPreviousWPM();
  const currentWpm = calculateWPM(timeLeft);

  const wpmDifference = currentWpm - previousWpm;

  if (previousWpm === null) return " - ";

  if (wpmDifference === 0) return `No change =`;

  const direction = wpmDifference > 0 ? "⬆" : "⬇";
  return `${wpmDifference > 0 ? 'Increase' : 'Drop'} by ${Math.abs(
    wpmDifference
  )} ${direction}`;
}
