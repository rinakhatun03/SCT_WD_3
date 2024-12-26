const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const cellElements = document.querySelectorAll('[data-cell]');
const board = document.getElementById('board');
const restartButton = document.getElementById('restartButton');
const modeSelect = document.getElementById('mode');

let circleTurn;
let isPlayerVsComputer;

startGame();

modeSelect.addEventListener('change', startGame);
restartButton.addEventListener('click', startGame);

function startGame() {
    circleTurn = false;
    isPlayerVsComputer = modeSelect.value === 'player-vs-computer';
    cellElements.forEach(cell => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleClick);
        cell.addEventListener('click', handleClick, { once: true });
    });
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
        if (isPlayerVsComputer && !circleTurn) {
            computerMove();
        }
    }
}

function endGame(draw) {
    if (draw) {
        alert('Draw!');
    } else {
        alert(`${circleTurn ? "O's" : "X's"} Wins!`);
    }
    startGame();
}

function isDraw() {
    return [...cellElements].every(cell => {
        return cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS);
    });
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}

function swapTurns() {
    circleTurn = !circleTurn;
}

function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some(combination => {
        return combination.every(index => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

function computerMove() {
    const availableCells = [...cellElements].filter(cell => 
        !cell.classList.contains(X_CLASS) && !cell.classList.contains(CIRCLE_CLASS)
    );
    const randomIndex = Math.floor(Math.random() * availableCells.length);
    const cell = availableCells[randomIndex];
    placeMark(cell, CIRCLE_CLASS);
    if (checkWin(CIRCLE_CLASS)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        swapTurns();
    }
}