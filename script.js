const colorBoxes = document.querySelectorAll(".color-box");
const startButton = document.getElementById("startButton");
const message = document.getElementById("message");
const colorPicker = document.getElementById("colorPicker");

let sequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;

startButton.addEventListener("click", startGame);

colorBoxes.forEach((box) => {
  box.addEventListener("click", handlePlayerClick);
});

colorPicker.addEventListener("input", changeColors);

function startGame() {
  resetGame();
  nextRound();
}

function resetGame() {
  sequence = [];
  playerSequence = [];
  level = 0;
  isPlayerTurn = false;
  message.textContent = "Game started! Watch the sequence.";
}

function nextRound() {
  level++;
  playerSequence = [];
  isPlayerTurn = false;
  message.textContent = `Level ${level}`;
  const nextColor = getRandomColor();
  sequence.push(nextColor);
  playSequence();
}

function getRandomColor() {
  const colors = ["green", "red", "yellow", "blue"];
  return colors[Math.floor(Math.random() * colors.length)];
}

function playSequence() {
  let delay = 500; // Initial delay before sequence starts
  sequence.forEach((color, index) => {
    setTimeout(() => {
      animateColor(color);
    }, delay * (index + 1));
  });

  setTimeout(() => {
    isPlayerTurn = true;
    message.textContent = "Your turn!";
  }, delay * (sequence.length + 1));
}

function animateColor(color) {
  const box = document.getElementById(color);
  box.classList.add("active");
  setTimeout(() => {
    box.classList.remove("active");
  }, 300);
}

function handlePlayerClick(event) {
  if (!isPlayerTurn) return;

  const color = event.target.dataset.color;
  playerSequence.push(color);
  animateColor(color);

  if (!checkPlayerSequence()) {
    message.textContent = "Wrong sequence! Game over.";
    isPlayerTurn = false;
    return;
  }

  if (playerSequence.length === sequence.length) {
    message.textContent = "Correct! Get ready for the next round.";
    setTimeout(nextRound, 1000);
  }
}

function checkPlayerSequence() {
  return playerSequence.every((color, index) => color === sequence[index]);
}

function changeColors() {
  const newColor = colorPicker.value;
  document.documentElement.style.setProperty("--primary-color", newColor);
  document.documentElement.style.setProperty(
    "--shadow-dark",
    shadeColor(newColor, -20)
  );
  document.documentElement.style.setProperty(
    "--shadow-light",
    shadeColor(newColor, 20)
  );
  document.documentElement.style.setProperty(
    "--text-color",
    newColor === "#000000" ? "#ffffff" : "#000000"
  );
}

function shadeColor(color, percent) {
  let R = parseInt(color.substring(1, 3), 16);
  let G = parseInt(color.substring(3, 5), 16);
  let B = parseInt(color.substring(5, 7), 16);

  R = parseInt((R * (100 + percent)) / 100);
  G = parseInt((G * (100 + percent)) / 100);
  B = parseInt((B * (100 + percent)) / 100);

  R = R < 255 ? R : 255;
  G = G < 255 ? G : 255;
  B = B < 255 ? B : 255;

  const RR = R.toString(16).length == 1 ? "0" + R.toString(16) : R.toString(16);
  const GG = G.toString(16).length == 1 ? "0" + G.toString(16) : G.toString(16);
  const BB = B.toString(16).length == 1 ? "0" + B.toString(16) : B.toString(16);

  return "#" + RR + GG + BB;
}
