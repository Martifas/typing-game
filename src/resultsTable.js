import { resultsTable } from "./domElements.js";
import {
  calculateAccuracy,
  calculateWPM,
  timeLeft,
} from "./metricsHandlers.js";
import { mistakeCount } from "./textHandlers.js";

const MAX_RESULTS = 5;

export function printResults() {
  let results = getStoredResults();

  let newResult = {
    time: getTime(),
    mistakes: mistakeCount,
    wpm: calculateWPM(timeLeft),
    accuracy: calculateAccuracy(),
    accuracy2: calculateAccuracy(),
  };

  results.unshift(newResult);

  if (results.length > MAX_RESULTS) {
    results = results.slice(0, MAX_RESULTS);
  }

  localStorage.setItem("results", JSON.stringify(results));
  displayResults(results);
}

function displayResults(results) {
  resultsTable.innerHTML = "";

  results.forEach((result) => {
    let row = resultsTable.insertRow(-1);
    let cell1 = row.insertCell(0);
    let cell2 = row.insertCell(1);
    let cell3 = row.insertCell(2);
    let cell4 = row.insertCell(3);
    let cell5 = row.insertCell(4);

    cell1.innerText = result.time;
    cell2.innerText = result.mistakes;
    cell3.innerText = result.wpm;
    cell4.innerText = result.accuracy;
    cell5.innerText = result.accuracy2;
  });
}

export const loadTable = () => {
  const results = getStoredResults();
  displayResults(results);
};

function getTime() {
  const now = new Date();
  const localTime = now.toLocaleString();
  return localTime;
}

function getStoredResults() {
  const storedData = localStorage.getItem("results");
  if (!storedData) return [];
  return JSON.parse(storedData);
}
