// Variables to keep track of game state
let currentPlayer = 'X';
let gameBoard = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

// DOM elements
const cells = document.querySelectorAll('.cell');
const statusMessage = document.querySelector('.status');
const resetButton = document.querySelector('.reset');

// Function to handle cell click
const handleCellClick = (event) => {
  const clickedCell = event.target;
  const clickedCellIndex = parseInt(clickedCell.dataset.index);

  // Check if the cell is empty and the game is still active
  if (gameBoard[clickedCellIndex] === '' && gameActive) {
    gameBoard[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;
    clickedCell.classList.add(currentPlayer);

    // Check for win or draw
    if (checkWin() || checkDraw()) {
      gameActive = false;
      statusMessage.textContent = checkWin() ? `Player ${currentPlayer} wins!` : "It's a draw!";
    } else {
      // Switch to the other player
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
      statusMessage.textContent = `Player ${currentPlayer}'s turn`;
    }
  }
};

// Function to check for a win
const checkWin = () => {
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  for (let combination of winningCombinations) {
    const [a, b, c] = combination;
    if (gameBoard[a] !== '' && gameBoard[a] === gameBoard[b] && gameBoard[a] === gameBoard[c]) {
      return true;
    }
  }
  return false;
};

// Function to check for a draw
const checkDraw = () => {
  return gameBoard.every(cell => cell !== '');
};

// Function to reset the game
const resetGame = () => {
  currentPlayer = 'X';
  gameBoard = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  statusMessage.textContent = `Player ${currentPlayer}'s turn`;
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('X', 'O');
  });
};

// Add click event listeners to cells and reset button
cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetButton.addEventListener('click', resetGame);
