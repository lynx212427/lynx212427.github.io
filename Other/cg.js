const diceElements = [
  document.getElementById("dice1"),
  document.getElementById("dice2"),
  document.getElementById("dice3"),
];
const rollButton = document.getElementById("roll-button");
const resultMessage = document.getElementById("result-message");
const historyList = document.getElementById("history-list");
const betDisplay = document.getElementById("bet-display");
const betAmountButtons = document.querySelectorAll(".bet-amount-button");
const balanceDisplay = document.getElementById("balance-display");
const colorButtons = document.getElementById("color-buttons");

const colors = [
  { name: "Red", value: "var(--red)" },
  { name: "White", value: "var(--white)", textColor: "#000000" },
  { name: "Blue", value: "var(--blue)" },
  { name: "Pink", value: "var(--pink)" },
  { name: "Yellow", value: "var(--yellow)", textColor: "#000000" },
  { name: "Green", value: "var(--green)" },
];

let userBalance = 1000; // Starting balance
let currentBetAmount = 0;
const bets = {}; // Track bets placed on each color

// Initialize bets
colors.forEach((color) => {
  bets[color.name] = 0;
});

function updateBalanceDisplay() {
  balanceDisplay.textContent = `Balance: $${userBalance}`;
}

function updateBetDisplay() {
  betDisplay.innerHTML = ""; // Clear previous bets
  Object.keys(bets).forEach((color) => {
    if (bets[color] > 0) {
      const betItem = document.createElement("div");
      betItem.innerHTML = `<span style="color:${colors.find((c) => c.name === color).value}">${color}: $${bets[color]}</span>`;
      betDisplay.appendChild(betItem);
    }
  });
}

function placeBet(color) {
  if (currentBetAmount <= 0 || currentBetAmount > userBalance) {
    resultMessage.textContent = "Invalid bet amount or insufficient balance.";
    return;
  }

  bets[color] += currentBetAmount;
  userBalance -= currentBetAmount;

  updateBalanceDisplay();
  updateBetDisplay();
  resultMessage.textContent = `You placed $${currentBetAmount} on ${color}.`;
}

function rollDice() {
  const rolledColors = [];

  diceElements.forEach((dice) => {
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    dice.style.backgroundColor = randomColor.value;
    dice.textContent = randomColor.name;
    dice.style.color = randomColor.textColor || "#ffffff";
    rolledColors.push(randomColor.name);
  });

  evaluateBets(rolledColors);
  showResult(rolledColors);
  updateHistory(rolledColors);
}

function evaluateBets(rolledColors) {
  let totalWinnings = 0;

  rolledColors.forEach((color) => {
    if (bets[color] > 0) {
      totalWinnings += bets[color] * 2; // Double the bet as reward
    }
  });

  userBalance += totalWinnings;
  resultMessage.textContent = `You won $${totalWinnings} in total!`;

  // Reset bets
  Object.keys(bets).forEach((color) => {
    bets[color] = 0;
  });

  updateBalanceDisplay();
  updateBetDisplay();
}

function showResult(rolledColors) {
  const rolledColorsText = rolledColors.join(", ");
  resultMessage.textContent += ` You rolled: ${rolledColorsText}.`;
}

function updateHistory(rolledColors) {
  const listItem = document.createElement("li");
  const colorText = rolledColors.join(", ");
  const colorBoxes = rolledColors
    .map((color) => {
      const colorObj = colors.find((c) => c.name === color);
      return `<div class="color-box" style="background: ${colorObj.value}"></div>`;
    })
    .join("");

  listItem.innerHTML = `<span>${colorText}</span><span>${colorBoxes}</span>`;
  historyList.appendChild(listItem);

  if (historyList.children.length > 10) {
    historyList.removeChild(historyList.firstChild);
  }
}

// Event Listeners
rollButton.addEventListener("click", rollDice);

betAmountButtons.forEach((button) => {
  button.addEventListener("click", () => {
    currentBetAmount = parseInt(button.dataset.amount, 10);

    // Highlight selected bet button
    betAmountButtons.forEach((btn) => {
      btn.style.backgroundColor = "";
    });
    button.style.backgroundColor = "var(--yellow)";
    resultMessage.textContent = `Selected bet amount: $${currentBetAmount}`;
  });
});

colors.forEach((color) => {
  const button = document.createElement("button");
  button.textContent = color.name;
  button.style.backgroundColor = color.value;
  button.style.color = color.textColor || "#ffffff";
  button.className = "color-button";
  button.addEventListener("click", () => placeBet(color.name));
  colorButtons.appendChild(button);
});

updateBalanceDisplay();
updateBetDisplay();
