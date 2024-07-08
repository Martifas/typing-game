import { generateText, startTimer } from './handlers.js';

document.addEventListener("DOMContentLoaded", () => {
  generateText();
  document.addEventListener('keydown', startTimer, { once: true});
});

