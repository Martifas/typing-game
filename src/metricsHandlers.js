import { MAX_TIME, ACCEPTABLE_WORD_LENGTH } from "./config.js";
import {
  timerElement,
  wpmElement,
  mistakesElement,
  accuracyElement,
} from "./domElements.js";
import {
  currentIndex,
  fullText,
  timeLeft,
  setTimeLeft,
  mistakeCount,
  setWpm,
  setAccuracy,
  setPerformance,
} from "./globals.js";
import { getPreviousWPM, printResults } from "./resultsTable.js";

let intervalId;

export function startTimer() {
  stopTimer();
  setTimeLeft(MAX_TIME);
  timerElement.innerText = timeLeft;
  intervalId = setInterval(() => {
    setTimeLeft(timeLeft - 1);
    calculateWPM();
    calculateAccuracy();
    calculatePerformance();
    wpmElement.innerText = calculateWPM();
    accuracyElement.innerText = calculateAccuracy();
    timerElement.innerText = timeLeft;
    endGame();
  }, 1000);
}

export function stopTimer() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

function endGame() {
  if (timeLeft <= 0 || currentIndex >= fullText.length) {
    stopTimer();
    printResults();
  }
}

export const updateMistakes = () => {
  mistakesElement.innerText = mistakeCount;
};

export function calculateWPM() {
  const elapsedTime = (MAX_TIME - timeLeft) / 60;
  const correctlyTypedWords =
    (currentIndex - mistakeCount) / ACCEPTABLE_WORD_LENGTH;
  const wpm = Math.round(correctlyTypedWords / elapsedTime) || 0;
  setWpm(wpm);
  return wpm;
}

export function calculateAccuracy() {
  if (currentIndex === 0) {
    setAccuracy(100);
    return 100;
  }
  const correctEntries = currentIndex - mistakeCount;
  const accuracy =
    correctEntries === 0
      ? 0
      : Math.round((correctEntries / currentIndex) * 100);
  setAccuracy(accuracy);
  return accuracy;
}

export function calculatePerformance() {
  const previousWpm = getPreviousWPM();
  const currentWpm = calculateWPM();
  const wpmDifference = currentWpm - previousWpm;
  let performanceText;
  if (previousWpm === null) {
    performanceText = " - ";
  } else if (wpmDifference === 0) {
    performanceText = "No change =";
  } else {
    const direction = wpmDifference > 0 ? "⬆" : "⬇";
    performanceText = `${wpmDifference > 0 ? "Increase" : "Drop"} by ${Math.abs(
      wpmDifference
    )} ${direction}`;
  }
  setPerformance(performanceText);
  return performanceText;
}
