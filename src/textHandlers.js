import {
  textContainer,
  timerElement,
  wpmElement,
  mistakesElement,
  accuracyElement,
} from "./domElements.js";
import { updateMistakes, startTimer, stopTimer } from "./metricsHandlers.js";
import { setCurrentIndex, spans } from "./main.js";
import { WORD_COUNT } from "./config.js";

export let mistakeCount = 0;

export async function generateText() {
  try {
    const response = await fetch(
      `https://random-word-form.herokuapp.com/random/noun/?count=${WORD_COUNT}`
    );
    const text = await response.text();
    let parseText = parseFetchedText(text);
    let fullText = parseText.join(" ");
    let spans = fullText.split("").map((char) => {
      let span = document.createElement("span");
      span.textContent = char;
      return span;
    });
    textContainer.innerText = "";
    spans.forEach((span) => textContainer.appendChild(span));
    return { fullText, spans };
  } catch (error) {
    console.log("Error getting text:", error);
    return {
      fullText: "Default text here",
      spans: ["Default", "text", "here"].map((word) => {
        let span = document.createElement("span");
        span.textContent = word + " ";
        return span;
      }),
    };
  }
}
export function highlightLetter(spans, currentIndex) {
  spans.forEach((span) => {
    span.style.textDecoration = "none";
    span.style.fontWeight = "normal";
  });

  if (currentIndex < spans.length) {
    spans[currentIndex].style.textDecoration = "underline";
    spans[currentIndex].style.fontWeight = "bold";
  }
}

export function greenOrRed(fullText, spans, currentIndex, keyPressed) {
  let currentChar = fullText[currentIndex];
  let correctInput = rightOrWrong(currentChar, keyPressed);
  if (currentIndex < spans.length) {
    if (correctInput) {
      spans[currentIndex].style.color = "green";
    } else {
      spans[currentIndex].style.color = "red";
      mistakeCount++;
    }
    spans[currentIndex].style.textDecoration = "none";
    spans[currentIndex].style.fontWeight = "normal";

    updateMistakes();
  }
}

export function goBackLetter(spans, currentIndex) {
  if (currentIndex > 0) {
    if (spans[currentIndex - 1].style.color === "red") {
      mistakeCount = Math.max(0, mistakeCount - 1);
    }
    spans[currentIndex - 1].style.color = "black";
    spans[currentIndex - 1].style.textDecoration = "none";
    spans[currentIndex - 1].style.fontWeight = "normal";

    updateMistakes();
  }
}

export function resetCurrentText() {
  mistakeCount = 0;
  setCurrentIndex(0);

  spans.forEach((span) => {
    span.style.color = "black";
    span.style.textDecoration = "none";
    span.style.fontWeight = "normal";
  });

  timerElement = 60;
  wpmElement.innerText = 0;
  mistakesElement.innerText = 0;
  accuracyElement.innerText = 100;

  highlightLetter(spans, 0);

  stopTimer();
  startTimer();
}

const parseFetchedText = (text) => JSON.parse(text);

const rightOrWrong = (expectedChar, inputChar) =>
  expectedChar.toLowerCase() === inputChar.toLowerCase();
