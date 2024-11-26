const words = [
  "The type of keyboard you use can affect your typing speed",
  "Code your ideas fast to bring them to life",
  "Having fun while typing makes practice more effective",
  "Code your ideas fast to bring them to life.",
];
let currentWord = "";
let countdown = 3;
let timeLeft = 15;
let timerInterval;
let gameRunning = false;

const countdownElement = document.getElementById("countdown");
const wordElement = document.getElementById("word");
const inputElement = document.getElementById("input");
const timerElement = document.getElementById("timer");
const resultElement = document.getElementById("result");
const restartButton = document.getElementById("restart-btn");

// Function to start the countdown
function startCountdown() {
  const countdownInterval = setInterval(() => {
    countdownElement.textContent = countdown;
    countdown--;
    if (countdown < 0) {
      clearInterval(countdownInterval);
      countdownElement.textContent = "Go!";
      startGame();
    }
  }, 1000);
}

// Function to start the game
function startGame() {
  gameRunning = true;
  countdownElement.style.display = "none";
  inputElement.disabled = false;
  inputElement.focus();
  showWord();
  startTimer();
}

// Function to display a random word
function showWord() {
  const randomIndex = Math.floor(Math.random() * words.length);
  currentWord = words[randomIndex];
  wordElement.textContent = currentWord;
  inputElement.value = "";
}

// Function to start the word timer
function startTimer() {
  timeLeft = 15;
  timerElement.textContent = `⏱ ${timeLeft}`;
  timerInterval = setInterval(() => {
    timeLeft--;
    timerElement.textContent = `⏱ ${timeLeft}`;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      resultElement.textContent = "❌ انتهى الوقت!";
      resultElement.style.color = "red";
      showWord();
      startTimer();
    }
  }, 1000);
}

// Event listener for input
inputElement.addEventListener("input", () => {
  const typedWord = inputElement.value.trim();
  if (typedWord === currentWord && gameRunning) {
    resultElement.textContent = "✔️ صحيح!";
    resultElement.style.color = "green";
    clearInterval(timerInterval);
    showWord();
    startTimer();
  }
});

// Restart the game
function restartGame() {
  gameRunning = false;
  countdown = 3;
  timeLeft = 15;
  countdownElement.style.display = "block";
  resultElement.textContent = "";
  restartButton.style.display = "none";
  inputElement.disabled = true;
  startCountdown();
}

// Initial setup
inputElement.disabled = true;
restartButton.style.display = "none";
startCountdown();
