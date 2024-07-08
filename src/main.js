import { generateText, highlightLetter, startTimer } from './handlers.js';

document.addEventListener("DOMContentLoaded", async () => {
  let fullText = await generateText();
  document.addEventListener('keydown', startTimer, { once: true});
  document.addEventListener('keydown', () => highlightLetter(fullText));
});

