// T: O(9^(n*n)), For every unassigned index, there are 9 possible options so the time complexity
// S: O(n*n), for storing board
// where n = board dimension
export function solveSudoku(board) {
  const nextCell = getNextEmptyCell(board);

  // No empty space left, board is complete
  if (!nextCell) {
    return board;
  }

  // Else for each-row backtrack
  const { row, col } = nextCell;

  for (let i = 0; i < DIGITS.length; i++) {
    let digit = DIGITS[i];
    if (isValid(board, nextCell, digit)) {
      board[row][col] = digit;
      if (solveSudoku(board)) {
        return board;
      } else {
        board[row][col] = EMPTY;
      }
    }
  }

  return false;
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const EMPTY = '.';
const BLOCK_ROWS = 3;
const BLOCK_COLS = 3;

function getNextEmptyCell(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] === EMPTY) {
        return { row, col };
      }
    }
  }
}

function isValid(board, nextCell, digit) {
  const { row, col } = nextCell;

  // Check row
  for (let trialRow = 0; trialRow < board.length; trialRow++) {
    if (board[trialRow][col] === digit) {
      return false;
    }
  }

  // Check column
  for (let trialCol = 0; trialCol < board[row].length; trialCol++) {
    if (board[row][trialCol] === digit) {
      return false;
    }
  }

  // Check block
  let startRow = row - row % BLOCK_ROWS;
  let startCol = col - col % BLOCK_COLS;
  for (let trialRow = startRow; trialRow < startRow + BLOCK_ROWS; trialRow++) {
    for (let trialCol = startCol; trialCol < startCol + BLOCK_COLS; trialCol++) {
      if (board[trialRow][trialCol] === digit) {
        return false;
      }
    }
  }

  return true;
}