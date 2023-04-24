// Game state
let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameover = false;

// Function to handle cell click
function makeMove(index) {
    if (!gameover && board[index] === "") {
        board[index] = currentPlayer;
        document.getElementById("board").children[index].innerText = currentPlayer;
        currentPlayer = (currentPlayer === "X") ? "O" : "X";
        checkWin();
    }
}

// Function to check for win/draw
function checkWin() {
    const winningCombos = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    for (let combo of winningCombos) {
        const [a, b, c] = combo;
        if (board[a] !== "" && board[a] === board[b] && board[a] === board[c]) {
            gameover = true;
            alert("Player " + board[a] + " wins!");  
        }
    }