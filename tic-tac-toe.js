// DOM Elements
const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status-text');
const restartBtn = document.getElementById('restart-btn');
const playFriendBtn = document.getElementById('play-friend');
const playComputerBtn = document.getElementById('play-computer');
const gameBoard = document.getElementById('game-board');

// Game Variables
let board = Array(9).fill(null);
let currentPlayer = "X";
let isGameActive = false;
let isVsComputer = false;

// Winning Combinations
const winningCombinations = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
    [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
    [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Initialize Game
function initializeGame() {
    cells.forEach(cell => {
        cell.textContent = '';
        cell.classList.remove('taken');
        cell.addEventListener('click', handleCellClick);
    });

    board = Array(9).fill(null);
    currentPlayer = "X";
    isGameActive = true;
    statusText.textContent = ${currentPlayer}'s turn;
    restartBtn.classList.remove('hidden');
}

// Handle Cell Click
function handleCellClick(event) {
    const cell = event.target;
    const index = parseInt(cell.dataset.index);

    if (board[index] || !isGameActive) return;

    board[index] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add('taken');

    if (checkWin(currentPlayer)) {
        statusText.textContent = ${currentPlayer} wins!;
        isGameActive = false;
        return;
    }

    if (board.every(cell => cell)) {
        statusText.textContent = "It's a draw!";
        isGameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.textContent = ${currentPlayer}'s turn;

    if (isVsComputer && currentPlayer === "O") {
        computerMove();
    }
}

// Check for Win
function checkWin(player) {
    return winningCombinations.some(combination =>
        combination.every(index => board[index] === player)
    );
}

// Computer Move
function computerMove() {
    setTimeout(() => {
        const availableCells = board
            .map((value, index) => (value === null ? index : null))
            .filter(value => value !== null);

        const randomIndex =
            availableCells[Math.floor(Math.random() * availableCells.length)];

        board[randomIndex] = currentPlayer;
        const cell = document.querySelector(.cell[data-index='${randomIndex}']);
        cell.textContent = currentPlayer;
        cell.classList.add('taken');

        if (checkWin(currentPlayer)) {
            statusText.textContent = ${currentPlayer} wins!;
            isGameActive = false;
            return;
        }

        if (board.every(cell => cell)) {
            statusText.textContent = "It's a draw!";
            isGameActive = false;
            return;
        }

        currentPlayer = "X";
        statusText.textContent = ${currentPlayer}'s turn;
    }, 500);
}

// Restart Game
restartBtn.addEventListener('click', initializeGame);

// Start Two Player Mode
playFriendBtn.addEventListener('click', () => {
    isVsComputer = false;
    gameBoard.classList.remove('hidden');
    initializeGame();
});

// Start vs Computer Mode
playComputerBtn.addEventListener('click', () => {
    isVsComputer = true;
    gameBoard.classList.remove('hidden');
    initializeGame();
});