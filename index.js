const rows = 6;
const cols = 7;
let currentPlayer = 'red';
let board = [];
let gameOver = false;

function createBoard() {
    const boardElement = document.getElementById('board');
    boardElement.innerHTML = '';
    board = [];
    for (let row = 0; row < rows; ++row) {
        let rowArray = [];
        for (let col = 0; col < cols; ++col) {
            const cell = document.createElement('div');
            cell.className = 'cell';
            cell.dataset.row = row;
            cell.dataset.col = col;
            cell.addEventListener('click', handleCellClick);
            boardElement.appendChild(cell);
            rowArray.push('');
        }
        board.push(rowArray);
    }
}

function switchPlayer() {
    if (currentPlayer === 'red') {
        currentPlayer = 'yellow';
    } else {
        currentPlayer = 'red';
    }
}

function checkWin(row, col) {
    const directions = [
        { r: 0, c: 1 }, 
        { r: 1, c: 0 }, 
        { r: 1, c: 1 }, 
        { r: 1, c: -1 } 
    ];
    for (let direction of directions) {
        let count = 1;
        for (let i = 1; i < 4; ++i) {
            const newRow = row + direction.r * i;
            const newCol = col + direction.c * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === currentPlayer) {
                ++count;
            } else {
                break;
            }
        }
        for (let i = 1; i < 4; ++i) {
            const newRow = row - direction.r * i;
            const newCol = col - direction.c * i;
            if (newRow >= 0 && newRow < rows && newCol >= 0 && newCol < cols && board[newRow][newCol] === currentPlayer) {
                ++count;
            } else {
                break;
            }
        }
        if (count >= 4) {
            return true;
        }
    }
    return false;
}

function dropDisc(col) {
    if (gameOver) return;
    for (let row = rows - 1; row >= 0; --row) {
        if (board[row][col] === '') {
            board[row][col] = currentPlayer;
            const cell = document.querySelector(`.cell[data-row='${row}'][data-col='${col}']`);
            cell.classList.add(currentPlayer);
            if (checkWin(row, col)) {
                document.getElementById('message').innerText = `Player ${currentPlayer} wins!`;
                gameOver = true;
            } else {
                switchPlayer();
            }
            break;
        }
    }
}

function handleCellClick(event) {
    const col = parseInt(event.target.dataset.col);
    dropDisc(col);
}

document.getElementById('resetButton').addEventListener('click', () => {
    createBoard();
    currentPlayer = 'red';
    gameOver = false;
    document.getElementById('message').innerText = '';
});

createBoard();
