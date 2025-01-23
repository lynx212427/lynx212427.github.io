const categorySelect = document.getElementById("category");
const startGameButton = document.getElementById("start-game");
const gameDiv = document.getElementById("game");
const questionDiv = document.getElementById("question");
const optionsDiv = document.getElementById("options");
const scoreDiv = document.getElementById("score");

let score = 0;
let currentQuestionIndex = 0;
let questions = [];
let gameResults = [];
let selectedCategory = null;


const popup = document.createElement('div');
popup.style.position = 'fixed';
popup.style.top = '50%';
popup.style.left = '50%';
popup.style.transform = 'translate(-50%, -50%)';
popup.style.backgroundColor = 'rgba(0,0,0,0.8)';
popup.style.color = 'white';
popup.style.padding = '20px';
popup.style.borderRadius = '10px';
popup.style.zIndex = '1000';
popup.style.display = 'none';
document.body.appendChild(popup);

function showPopup(message, isCorrect) {
    popup.innerHTML = message;
    popup.style.backgroundColor = isCorrect ? 'rgba(0,150,0,0.8)' : 'rgba(200,0,0,0.8)';
    popup.style.display = 'block';
    setTimeout(() => {
        popup.style.display = 'none';
    }, 2000);
}

async function fetchCategories() {
    const response = await fetch("https://opentdb.com/api_category.php");
    const data = await response.json();
    categorySelect.innerHTML = '<option value="">--Select a category--</option>';
    data.trivia_categories.forEach(category => {
        const option = document.createElement("option");
        option.value = category.id;
        option.textContent = category.name;
        categorySelect.appendChild(option);
    });
}

async function fetchQuestions(categoryId) {
    const url = `https://opentdb.com/api.php?amount=10&category=${categoryId}&type=multiple`;
    const response = await fetch(url);
    const data = await response.json();
    questions = data.results;
}

function updateScoreDisplay() {
    scoreDiv.innerHTML = `Score: ${score}/${currentQuestionIndex}`;
}

function displayQuestion() {
    if (currentQuestionIndex >= questions.length) {
        showGameResults();
        return;
    }
    const question = questions[currentQuestionIndex];
    questionDiv.innerHTML = question.question;
    optionsDiv.innerHTML = "";

    const options = [...question.incorrect_answers, question.correct_answer];
    options.sort(() => Math.random() - 0.5);
    options.forEach(option => {
        const button = document.createElement("button");
        button.textContent = option;
        button.addEventListener("click", () => checkAnswer(button, option, question.correct_answer));
        optionsDiv.appendChild(button);
    });

    updateScoreDisplay();
}

function checkAnswer(button, selected, correct) {
    let isCorrect = selected === correct;
    if (isCorrect) {
        score++;
        button.classList.add("correct");
        showPopup("Correct! Great job!", true);
    } else {
        button.classList.add("incorrect");
        showPopup(`Incorrect. The correct answer was: ${correct}`, false);
    }
    
    gameResults.push({
        question: questions[currentQuestionIndex].question,
        userAnswer: selected,
        correctAnswer: correct,
        isCorrect: isCorrect
    });

    currentQuestionIndex++;
    setTimeout(displayQuestion, 2000);
}

function showGameResults() {
    let resultsHTML = `
        <h2>Game Over!</h2>
        <p>Final Score: ${score}/${questions.length}</p>
        <div class="results-details">
            <h3>Detailed Results:</h3>
    `;

    gameResults.forEach((result, index) => {
        resultsHTML += `
            <div class="result-item ${result.isCorrect ? 'correct' : 'incorrect'}">
                <p><strong>Question ${index + 1}:</strong> ${result.question}</p>
                <p>Your Answer: ${result.userAnswer}</p>
                <p>Correct Answer: ${result.correctAnswer}</p>
                <p>Result: ${result.isCorrect ? 'Correct ✓' : 'Incorrect ✗'}</p>
            </div>
        `;
    });

    resultsHTML += `
        </div>
        <div class="game-over-actions">
            <button id="play-again" class="btn btn-primary">Play Again in Same Category</button>
            <button id="new-category" class="btn btn-secondary">Choose New Category</button>
            <a href="home.html" class="btn btn-info">Back to Home</a>
        </div>
    `;
    
    gameDiv.innerHTML = resultsHTML;

    document.getElementById('play-again').addEventListener('click', restartGame);
    document.getElementById('new-category').addEventListener('click', resetToCategory);
}

function restartGame() {
    score = 0;
    currentQuestionIndex = 0;
    gameResults = [];
    
    gameDiv.style.display = "block";
    fetchQuestions(selectedCategory).then(displayQuestion);
}

function resetToCategory() {
    gameDiv.style.display = "none";
    document.getElementById('category-select').style.display = "block";
    categorySelect.value = "";
}

startGameButton.addEventListener("click", async () => {
    selectedCategory = categorySelect.value;
    if (!selectedCategory) {
        alert("Please select a category!");
        return;
    }
    
    document.getElementById('category-select').style.display = "none";
    score = 0;
    currentQuestionIndex = 0;
    gameResults = [];
    
    gameDiv.style.display = "block";
    await fetchQuestions(selectedCategory);
    displayQuestion();
});

fetchCategories();