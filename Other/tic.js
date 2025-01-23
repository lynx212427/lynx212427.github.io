const cells = document.querySelectorAll(".cell");
const message = document.getElementById("message");
const resetButton = document.getElementById("reset");

let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

function checkWin(player) {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === player)
  );
}

function checkDraw() {
  return board.every(cell => cell !== "");
}

function aiMove() {
  const emptyCells = board
    .map((cell, index) => (cell === "" ? index : null))
    .filter(index => index !== null);

  const randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
  board[randomIndex] = "O";
  cells[randomIndex].textContent = "O";
  cells[randomIndex].classList.add("taken");

  if (checkWin("O")) {
    message.textContent = "AI wins!";
    endGame();
    return;
  }

  if (checkDraw()) {
    message.textContent = "It's a draw!";
    endGame();
  }
}

function playerMove(index) {
  if (board[index] !== "" || message.textContent !== "") return;

  board[index] = "X";
  cells[index].textContent = "X";
  cells[index].classList.add("taken");

  if (checkWin("X")) {
    message.textContent = "You win!";
    endGame();
    return;
  }

  if (checkDraw()) {
    message.textContent = "It's a draw!";
    endGame();
    return;
  }

  aiMove();
}

function endGame() {
  cells.forEach(cell => cell.classList.add("taken"));
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
  message.textContent = "";
  currentPlayer = "X";
}

cells.forEach((cell, index) => {
  cell.addEventListener("click", () => playerMove(index));
});

resetButton.addEventListener("click", resetGame);
