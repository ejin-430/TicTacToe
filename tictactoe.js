let board = ['', '', '', '', '', '', '', '', ''];
// Player X starts first 
let currentPlayer = 'X';
let gameActive = true;

document.addEventListener("DOMContentLoaded", createBoard);

function createBoard() {
    const boardElement = document.getElementById('board');
    
    // Clear the board before render
    boardElement.innerHTML = '';

    board.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        
        // If cell is not empty, then mark it as taken 
        if (cell !== '') {
            cellElement.classList.add('taken');
        }

        cellElement.textContent = cell;

        // Click event to handle user moves 
        cellElement.addEventListener('click', () => makeMove(index));
        boardElement.appendChild(cellElement);
    });
}

function makeMove(index) {
    // Cannot make move if game is over, or if the cell is taken 
    if (!gameActive || board[index] !== '') {
        return;
    }

    // Update board with new move 
    board[index] = currentPlayer;
    // Check if current user wins 
    checkWinner(); 
    // Switch turns between player X and O
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    updateStatus();
    createBoard();
}

function checkWinner() {
    const winPatterns = [
        // Horizontal wins 
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        // Vertical wins 
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        // Diagonal wins 
        [0, 4, 8], [2, 4, 6]
    ];

    for (let pattern of winPatterns) {
        // Current pattern 
        const [a, b, c] = pattern;

        // Check if the current pattern matches a win pattern, 
        // if so, stop the game and display win message 
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            gameActive = false;
            document.querySelector('.status').textContent = `Player ${board[a]} Wins!`;
            return;
        }
    }

    // If all cells are taken, it's a draw 
    if (!board.includes('')) {
        gameActive = false;
        document.querySelector('.status').textContent = "It's a Draw!";
    }
}

function updateStatus() {
    if (gameActive) {
        document.querySelector('.status').textContent = `Player ${currentPlayer}'s turn`;
    }
}

function resetGame() {
    board = ['', '', '', '', '', '', '', '', ''];
    currentPlayer = 'X';
    gameActive = true;
    updateStatus();
    createBoard();
}
