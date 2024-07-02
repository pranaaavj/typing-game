const RAMDOM_QUOTE_API_URL = "https://api.quotable.io/random";
const quoteDisplayElement = document.getElementById("quoteDisplay");
const quoteInputElement = document.getElementById("quoteInput");
const timer = document.querySelector(".timer");

function getRandomQuote() {
  return fetch(RAMDOM_QUOTE_API_URL)
    .then((response) => response.json())
    .then((data) => data.content);
}
async function renderNewQuote() {
  const quote = await getRandomQuote();
  quoteDisplayElement.innerText = "";
  quote.split("").forEach((character) => {
    const charaterSpan = document.createElement("span");
    charaterSpan.innerText = character;
    quoteDisplayElement.appendChild(charaterSpan);
  });
  quoteInputElement.value = null;
  startTimer();
}

renderNewQuote();

quoteInputElement.addEventListener("input", () => {
  const arrayQuote = quoteDisplayElement.querySelectorAll("span");
  const arrayValue = quoteInputElement.value.split("");
  let correct = true;
  arrayQuote.forEach((characterSpan, index) => {
    const character = arrayValue[index];
    if (character == null) {
      characterSpan.classList.remove("incorrect");
      characterSpan.classList.remove("correct");
      correct = false;
    } else if (character == characterSpan.innerText) {
      characterSpan.classList.add("correct");
      characterSpan.classList.remove("incorrect");
    } else {
      characterSpan.classList.remove("correct");
      characterSpan.classList.add("incorrect");
      correct = false;
    }
  });

  if (correct) renderNewQuote();
});

let startTime;
function startTimer() {
  timer.innerText = 0;
  startTime = new Date();
  setInterval(() => {
    timer.textContent = getTimer();
  }, 1000);
}

function getTimer() {
  return Math.floor((new Date() - startTime) / 1000);
}
