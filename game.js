// Game Variables
const colors = ["red", "green", "blue", "yellow", "purple"];
let score = 0;
let time = 30;
let targetColor = colors[Math.floor(Math.random() * colors.length)];
let isFrozen = false;

// DOM Elements
const targetColorElement = document.getElementById("targetColor");
const scoreElement = document.getElementById("score");
const timerElement = document.getElementById("timer");
const gameElement = document.getElementById("game");
const powerUpButton = document.getElementById("powerUp");

// Modal Elements
const gameOverModal = document.getElementById("gameOverModal");
const finalScoreElement = document.getElementById("finalScore");
const restartButton = document.getElementById("restartButton");

const freezeTimeModal = document.getElementById("freezeTimeModal");
const watchAdButton = document.getElementById("watchAdButton");
const cancelButton = document.getElementById("cancelButton");

// Sound Elements
const correctSound = document.getElementById("correctSound");
const incorrectSound = document.getElementById("incorrectSound");
const gameOverSound = document.getElementById("gameOverSound");

// Create Tiles
for (let i = 0; i < 9; i++) {
  const tile = document.createElement("div");
  tile.classList.add("tile");
  tile.addEventListener("click", () => handleTileClick(tile));
  gameElement.appendChild(tile);
  updateTileColor(tile); // Set initial tile colors
}

// Update Tile Colors Every 2 Seconds
const colorUpdateInterval = setInterval(() => {
  if (!isFrozen) {
    document.querySelectorAll(".tile").forEach(updateTileColor);
  }
}, 2000);

// Timer
const timer = setInterval(() => {
  if (time > 0) {
    time--;
    timerElement.textContent = `Time: ${time}`;
  } else {
    clearInterval(timer);
    clearInterval(colorUpdateInterval); // Stop updating tile colors
    gameOverSound.play(); // Play game over sound
    showGameOverModal();
  }
}, 1000);

// Handle Tile Click
function handleTileClick(tile) {
  if (tile.style.backgroundColor === targetColor) {
    score += 10;
    scoreElement.textContent = `Score: ${score}`;
    correctSound.play(); // Play correct sound
  } else {
    score -= 5;
    scoreElement.textContent = `Score: ${score}`;
    incorrectSound.play(); // Play incorrect sound
  }
  // Set a new target color
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  targetColorElement.textContent = targetColor.toUpperCase();
  // Add a pulse animation to the target color
  targetColorElement.classList.add("pulse");
  setTimeout(() => targetColorElement.classList.remove("pulse"), 500);
}

// Update Tile Color
function updateTileColor(tile) {
  const randomColor = colors[Math.floor(Math.random() * colors.length)];
  tile.style.backgroundColor = randomColor;
}

// Show Freeze Time Modal
powerUpButton.addEventListener("click", () => {
  freezeTimeModal.style.display = "flex";
});

// Watch Ad Button
watchAdButton.addEventListener("click", () => {
  freezeTimeModal.style.display = "none";
  isFrozen = true;
  setTimeout(() => {
    isFrozen = false;
  }, 10000); // Unfreeze after 10 seconds
});

// Cancel Button
cancelButton.addEventListener("click", () => {
  freezeTimeModal.style.display = "none";
});

// Show Game Over Modal
function showGameOverModal() {
  finalScoreElement.textContent = score;
  gameOverModal.style.display = "flex";
}

// Restart Game
restartButton.addEventListener("click", () => {
  gameOverModal.style.display = "none";
  resetGame();
});

// Reset Game
function resetGame() {
  score = 0;
  time = 30;
  targetColor = colors[Math.floor(Math.random() * colors.length)];
  isFrozen = false;
  scoreElement.textContent = `Score: ${score}`;
  timerElement.textContent = `Time: ${time}`;
  targetColorElement.textContent = targetColor.toUpperCase();
  document.querySelectorAll(".tile").forEach(updateTileColor);
  initTimer();
}

// Initialize Timer
function initTimer() {
  clearInterval(timer);
  setInterval(() => {
    if (time > 0) {
      time--;
      timerElement.textContent = `Time: ${time}`;
    } else {
      clearInterval(timer);
      clearInterval(colorUpdateInterval); // Stop updating tile colors
      gameOverSound.play(); // Play game over sound
      showGameOverModal();
    }
  }, 1000);
}

// Load Monetag Banner Ad
function loadBannerAd() {
  const bannerAd = document.getElementById("banner-ad");
  // Monetag ad display logic
  bannerAd.innerHTML = `
    <div id="monetag-banner-ad" style="width: 100%; height: 100%;"></div>
  `;
  // Initialize Monetag ad
  if (typeof monetag !== 'undefined') {
    monetag.allowedAdTypes = ['banner'];
    monetag.start();
  } else {
    console.error("Monetag script not loaded.");
  }
}

// Initialize the game
function init() {
  loadBannerAd();
  targetColorElement.textContent = targetColor.toUpperCase();
}

// Start the game
init();