let size = 4;
const board = document.getElementById("board");
let queens = new Set();

function initializeGame() {
    size = parseInt(document.getElementById("boardSize").value);
    queens.clear();
    board.innerHTML = "";
    board.style.gridTemplateColumns = `repeat(${size}, 60px)`;
    createBoard();
}

function createBoard() {
    for (let row = 0; row < size; row++) {
        for (let col = 0; col < size; col++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener("click", placeQueen);
            board.appendChild(cell);
        }
    }
}

function placeQueen(event) {
    let cell = event.target;
    let row = parseInt(cell.dataset.row);
    let col = parseInt(cell.dataset.col);
    let position = row + "-" + col;
    
    if (queens.has(position)) {
        queens.delete(position);
        cell.innerHTML = "";
        cell.classList.remove("queen", "invalid");
    } else {
        if (queens.size < size) {
            queens.add(position);
            cell.innerHTML = "♛";
            cell.classList.add("queen");
        }
    }
    validateBoard();
}

function validateBoard() {
    document.querySelectorAll(".cell").forEach(cell => cell.classList.remove("invalid"));
    let queenPositions = Array.from(queens).map(q => q.split("-").map(Number));
    for (let [r1, c1] of queenPositions) {
        for (let [r2, c2] of queenPositions) {
            if (r1 === r2 && c1 === c2) continue;
            if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                document.querySelector(`[data-row='${r2}'][data-col='${c2}']`).classList.add("invalid");
            }
        }
    }
}

function checkSolution() {
    let queenPositions = Array.from(queens).map(q => q.split("-").map(Number));
    let valid = isValidNQueens(queenPositions);
    document.getElementById("result").innerText = valid ? "🎉 Correct! Well done!" : "❌ Incorrect placement! Try again.";
}

function isValidNQueens(positions) {
    let n = positions.length;
    for (let i = 0; i < n; i++) {
        for (let j = i + 1; j < n; j++) {
            let [r1, c1] = positions[i];
            let [r2, c2] = positions[j];
            if (r1 === r2 || c1 === c2 || Math.abs(r1 - r2) === Math.abs(c1 - c2)) {
                return false;
            }
        }
    }
    return n === size;
}

initializeGame();


