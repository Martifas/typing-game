import { textContainer } from "../globals/domElements.js";
import { updateMistakes } from "./metricsHandlers.js";
import { DEFAULT_TEXT, WORD_COUNT } from "./config.js";
import { setMistakeCount, mistakeCount } from "../globals/states.js";

export async function generateText() {
  try {
    return fetchText();
  } catch (error) {
    return handleErrors();
  }
}

async function fetchText() {
  const response = await fetch(
    `https://random-word-form.herokuapp.com/random/noun/?count=${WORD_COUNT}`
  );
  const text = await response.text();
  let parseText = parseFetchedText(text);
  let fullText = parseText.join(" ");
  let spans = turnEveryCharToSpan(fullText);
  textContainer.innerText = "";
  spans.forEach((span) => textContainer.appendChild(span));
  return { fullText, spans };
}

function turnEveryCharToSpan(fullText) {
  return fullText.split("").map((char) => {
    let span = document.createElement("span");
    span.textContent = char;
    return span;
  });
}

function handleErrors() {
  console.log("Error getting text:", error);
  let fullText = DEFAULT_TEXT;
  let spans = turnEveryCharToSpan(fullText);
  textContainer.innerText = "";
  spans.forEach((span) => textContainer.appendChild(span));
  return { fullText, spans };
}

export function highlightCurrentLetter(spans, currentIndex) {
  spans.forEach((span) => {
    span.style.textDecoration = "none";
    span.style.fontWeight = "normal";
  });

  if (currentIndex < spans.length) {
    spans[currentIndex].style.textDecoration = "underline";
    spans[currentIndex].style.fontWeight = "bold";
  }
}

export function styleLettersGreenOrRed(fullText, spans, currentIndex, keyPressed) {
  let currentChar = fullText[currentIndex];
  let correctInput = isCorrectInput(currentChar, keyPressed);
  if (currentIndex < spans.length) {
    if (correctInput) {
      spans[currentIndex].style.color = "green";
    } else {
      spans[currentIndex].style.color = "red";
      setMistakeCount(mistakeCount + 1);
    }
    spans[currentIndex].style.textDecoration = "none";
    spans[currentIndex].style.fontWeight = "normal";

    updateMistakes();
  }
}

export function handleBackspaceInput(spans, currentIndex) {
  if (currentIndex > 0) {
    if (spans[currentIndex - 1].style.color === "red") {
      setMistakeCount(Math.max(0, mistakeCount - 1));
    }
    spans[currentIndex - 1].style.color = "black";
    spans[currentIndex - 1].style.textDecoration = "none";
    spans[currentIndex - 1].style.fontWeight = "normal";

    updateMistakes();
  }
}

const parseFetchedText = (text) => JSON.parse(text);

const isCorrectInput = (expectedChar, inputChar) =>
  expectedChar.toLowerCase() === inputChar.toLowerCase();
