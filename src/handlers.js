import { textContainer, timerElement, mistakesElement } from "./domElements.js";

export async function generateText() {
  try {
    const response = await fetch(
      "https://random-word-form.herokuapp.com/random/noun/?count=30"
    );
    const text = await response.text();
    let parseText = parseFetchedText(text);
    let fullText = parseText.join(" ");
    let spans = fullText.split("").map((char) => {
      let span = document.createElement("span");
      span.textContent = char;
      return span;
    });
    textContainer.innerHTML = "";
    spans.forEach((span) => textContainer.appendChild(span));
    return { fullText, spans };
  } catch (error) {
    console.log("Error getting text:", error);
    return { fullText: "", spans: [] };
  }
}

export function startTimer() {
  let timeLeft = 60;
  let timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      console.log("Time's up!");
    }
  }, 1000);
}

function parseFetchedText(text) {
  return JSON.parse(text);
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
    spans[currentIndex].style.color = correctInput ? "green" : "red";
    spans[currentIndex].style.textDecoration = "none";
    spans[currentIndex].style.fontWeight = "normal";

    mistakesElement.innerText = countMistakes(spans);
  }
}

function rightOrWrong(expectedChar, inputChar) {
  return expectedChar.toLowerCase() === inputChar.toLowerCase();
}

export function goBackLetter(spans, currentIndex) {
  if (currentIndex > 0) {
    spans[currentIndex - 1].style.color = "black";
    spans[currentIndex - 1].style.textDecoration = "none";
    spans[currentIndex - 1].style.fontWeight = "normal";
  }
}

function countMistakes(spans) {
  return Array.from(spans).filter((span) => span.style.color === "red").length;
}
