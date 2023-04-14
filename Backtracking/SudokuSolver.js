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

function getNextEmptyCell(board) {
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[0].length; col++) {
      if (board[row][col] === EMPTY) {
        return { row, col };
      }
    }
  }
}

function isValid(board, nextCell, digit) {
  const { row, col } = nextCell;

  // Check row
  for (let i = 0; i < board.length; i++) {
    if (board[i][col] === digit) {
      return false;
    }
  }

  // Check column
  for (let j = 0; j < board[0].length; j++) {
    if (board[row][j] === digit) {
      return false;
    }
  }

  // Check block
  let startCol = col - col % 3;
  let startRow = row - row % 3;
  for (let i = startRow; i < startRow + 3; i++) {
    for (let j = startCol; j < startCol + 3; j++) {
      if (board[i][j] === digit) {
        return false;
      }
    }
  }

  return true;
}
