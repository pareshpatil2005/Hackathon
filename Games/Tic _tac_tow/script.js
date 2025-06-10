let board = ['', '', '', '', '', '', '', '', ''];
let currentPlayer = 'X';
let gameActive = true;

document.addEventListener("DOMContentLoaded", () => {
    const boardElement = document.getElementById("board");
    boardElement.innerHTML = '';
    for (let i = 0; i < 9; i++) {
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i;
        cell.addEventListener("click", handleMove);
        boardElement.appendChild(cell);
    }
});

function handleMove(event) {
    const index = event.target.dataset.index;
    if (board[index] || !gameActive) return;
    board[index] = currentPlayer;
    event.target.innerText = currentPlayer;
    if (checkWin()) {
        document.getElementById("status").innerText = `${currentPlayer} Wins! 🎉`;
        gameActive = false;
        return;
    }
    if (!board.includes('')) {
        document.getElementById("status").innerText = "It's a Draw!";
        gameActive = false;
        return;
    }
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
}

function checkWin() {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern => 
        pattern.every(index => board[index] === currentPlayer)
    );
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    document.getElementById("status").innerText = "";
    document.querySelectorAll(".cell").forEach(cell => cell.innerText = "");
}
