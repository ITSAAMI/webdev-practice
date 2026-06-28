let playerScore = 0;
let computerScore = 0;

const choices = ['rock', 'paper', 'scissors'];
const emojis = {
    rock: '✊',
    paper: '✋',
    scissors: '✌️'
};

function getComputerChoice() {
    return choices[Math.floor(Math.random() * choices.length)];
}

function determineWinner(player, computer) {
    if (player === computer) {
        return 'tie';
    }
    
    if (
        (player === 'rock' && computer === 'scissors') ||
        (player === 'paper' && computer === 'rock') ||
        (player === 'scissors' && computer === 'paper')
    ) {
        return 'win';
    }
    
    return 'lose';
}

function playGame(playerChoice) {
    const computerChoice = getComputerChoice();
    const result = determineWinner(playerChoice, computerChoice);
    
    if (result === 'win') {
        playerScore++;
    } else if (result === 'lose') {
        computerScore++;
    }
    
    displayResult(playerChoice, computerChoice, result);
    updateScore();
}

function displayResult(player, computer, result) {
    const resultDiv = document.getElementById('result');
    const resultText = document.getElementById('resultText');
    const choicesDisplay = document.getElementById('choicesDisplay');
    
    let message = '';
    let className = '';
    
    if (result === 'win') {
        message = '🎉 You Win!';
        className = 'win';
    } else if (result === 'lose') {
        message = '😢 You Lose!';
        className = 'lose';
    } else {
        message = '🤝 It\'s a Tie!';
        className = 'tie';
    }
    
    resultText.textContent = message;
    resultText.className = `result-text ${className}`;
    choicesDisplay.textContent = `You: ${emojis[player]} | Computer: ${emojis[computer]}`;
    resultDiv.style.display = 'block';
}

function updateScore() {
    document.getElementById('playerScore').textContent = playerScore;
    document.getElementById('computerScore').textContent = computerScore;
}

function resetGame() {
    playerScore = 0;
    computerScore = 0;
    updateScore();
    document.getElementById('result').style.display = 'none';
}