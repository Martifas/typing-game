export let currentIndex = 0;
export let fullText = "";
export let spans = [];
export let isGameActive = false;
export let timeLeft = 0;
export let mistakeCount = 0;
export let wpm = 0;
export let accuracy = 0;
export let performance = 0;


export function setAccuracy(value) {
  accuracy = value;
}
export function setWpm(value) {
  wpm = value;
}
export function setPerformance(value) {
  performance = value;
}
export function setCurrentIndex(value) {
  currentIndex = value;
}

export function setFullText(value) {
  fullText = value;
}

export function setSpans(value) {
  spans = value;
}

export function setIsGameActive(value) {
  isGameActive = value;
}

export function setTimeLeft(value) {
  timeLeft = value;
}

export function setMistakeCount(value) {
  mistakeCount = value;
}