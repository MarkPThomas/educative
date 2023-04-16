// T: O(9^(n*n)), For every unassigned index, there are 9 possible options so the time complexity.
// Pruning reduces the average time complexity, but the upperbound remains the same.
// S: O(n*n), for storing board
// where n = board dimension
function solveSudoku(board) {
  const usedCoordsByDigit = getUsedCoordsByDigit(board);
  const digitsByOrder = getDigitIndicesOrder(usedCoordsByDigit);
  const unusedCoordsByDigit = getUnusedCoordsByDigit(usedCoordsByDigit, board.length, board[0].length);
  const firstDigitIndex = 0;
  const unusedRowsForDigit = Object.keys(unusedCoordsByDigit[digitsByOrder[firstDigitIndex]]);

  return fillMatrix(firstDigitIndex, 0, unusedRowsForDigit, digitsByOrder, unusedCoordsByDigit, board);
}

const DIGITS = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const EMPTY = '.';
const BLOCK_ROWS = 3;
const BLOCK_COLS = 3;

// Position of the starting elements in the arr
// pos = {
//	 value: [[row_i, col_i],...]
// }
// where value = 1-9
// This records by value key the cells where it is already used
function getUsedCoordsByDigit(board) {
  const usedCoordsByDigit = {};

  // Add each used digit and it's coordinate occurrence
  for (let row = 0; row < board.length; row++) {
    for (let col = 0; col < board[row].length; col++) {
      if (board[row][col] !== EMPTY) {
        const usedDigit = board[row][col];
        if (!usedCoordsByDigit.hasOwnProperty(usedDigit)) {
          usedCoordsByDigit[usedDigit] = [];
        }
        usedCoordsByDigit[usedDigit].push({ row, col });
      }
    }
  }

  // Add placeholders for any digits not found on board
  DIGITS.forEach((digit) => {
    if (!usedCoordsByDigit.hasOwnProperty(digit)) {
      usedCoordsByDigit[digit] = [];
    }
  });

  return usedCoordsByDigit;
}

// Returns the order of the DIGITS indices to fill by index
function getDigitIndicesOrder(usedCoordsByDigit) {
  const remainingPlacementsForDigit = {};

  // Add the count for the remaining places to fill for each digit
  // Note that each digit should be used once in each row, column, and block
  for (const digit in usedCoordsByDigit) {
    remainingPlacementsForDigit[digit] = DIGITS.length - usedCoordsByDigit[digit].length;
  }

  // Sort these in ascending order by # of placements still needed for each digit
  const entries = Object.entries(remainingPlacementsForDigit).sort((a, b) => a[1] - b[1]);
  const sortedKeys = [];
  for (const value of Object.values(entries)) {
    sortedKeys.push(value[0]);
  }
  return sortedKeys;
}

function isInBox(row, col, usedCoord) {
  const colMin = usedCoord.col - usedCoord.col % BLOCK_COLS;
  const colMax = usedCoord.col - usedCoord.col % BLOCK_COLS + BLOCK_COLS;
  const rowMin = usedCoord.row - usedCoord.row % BLOCK_ROWS;
  const rowMax = usedCoord.row - usedCoord.row % BLOCK_ROWS + BLOCK_ROWS;

  return (colMin <= col && col < colMax && rowMin <= row && row < rowMax);
}

// Graph defining tentative positions of the elements to be filled
// These are accessed in order of values in sorted rem object
// graph = {
//	 value: {
//		 unfilledRow1: [unfilled columns],
//		 unfilledRow2: [unfilled columns]
//	 }
// }
// where value = 1-9
function getUnusedCoordsByDigit(usedCoordsByDigit, boardRowCount, boardColCount) {
  const unusedCoordsByDigit = {};

  for (const [digit, usedCoords] of Object.entries(usedCoordsByDigit)) {
    // Compile a list of row & column indices that do not have pre-filled values
    const potentialRows = [...Array(boardRowCount).keys()];
    const potentialCols = [...Array(boardColCount).keys()];
    usedCoords.forEach((usedCoord) => {
      potentialRows.splice(potentialRows.indexOf(usedCoord.row), 1);
      potentialCols.splice(potentialCols.indexOf(usedCoord.col), 1);
    });


    // Continue on if value is present once in each row & column
    if (potentialRows.length === 0 || potentialCols.length === 0) {
      continue;
    }

    // Include box occurrences
    const potentialColsReduced = {};
    potentialRows.forEach((row) => {
      potentialColsReduced[row] = [];
      potentialCols.forEach((col) => {
        let isUsedInBox = false;
        for (let i = 0; i < usedCoords.length; i++) {
          if (isInBox(row, col, usedCoords[i])) {
            isUsedInBox = true;
            break;
          }
        }
        if (!isUsedInBox) {
          potentialColsReduced[row].push(col);
        }
      })
    });

    // For any coords without pre-filled values for the current digit:
    if (!unusedCoordsByDigit.hasOwnProperty(digit)) {
      unusedCoordsByDigit[digit] = {};
    }
    for (let potentialRow of potentialRows) {
      const potentialColsForRow = potentialColsReduced[potentialRow];
      for (let potentialCol of potentialColsForRow) {
        if (!unusedCoordsByDigit[digit].hasOwnProperty(potentialRow)) {
          unusedCoordsByDigit[digit][potentialRow] = [];
        }
        unusedCoordsByDigit[digit][potentialRow].push(potentialCol);
      }
    }
  }
  return unusedCoordsByDigit;
}

function fillMatrix(digitIndex, rowIndex, unusedRowsForDigit, digitsByOrder, unusedCoordsByDigit, board) {
  const digit = digitsByOrder[digitIndex];
  const unusedRow = unusedRowsForDigit[rowIndex];

  for (let unusedCol of unusedCoordsByDigit[digit][unusedRow]) {
    if (board[unusedRow][unusedCol] !== EMPTY) {
      continue;
    }

    // Try placing current digit on board and if valid, continue path along all unused rows, and then each next digit
    if (isValid(board, { row: unusedRow, col: unusedCol }, digit)) {
      board[unusedRow][unusedCol] = digit;
      if (rowIndex < unusedRowsForDigit.length - 1) {
        // Check the next unused row for the current digit
        if (fillMatrix(digitIndex, rowIndex + 1, unusedRowsForDigit, digitsByOrder, unusedCoordsByDigit, board)) {
          return true;
        }
      } else if (digitIndex < DIGITS.length - 1) {
        // Get next digit and associated unused rows and begin checking them from the first row
        const nextDigitIndex = digitIndex + 1;
        unusedRowsForDigit = Object.keys(unusedCoordsByDigit[digitsByOrder[nextDigitIndex]]);

        if (fillMatrix(nextDigitIndex, 0, unusedRowsForDigit, digitsByOrder, unusedCoordsByDigit, board)) {
          return true;
        }
      } else {
        return true;
      }
      // Backtrack
      board[unusedRow][unusedCol] = EMPTY;
    }
  }
  return false;
}

function isValid(board, coord, digit) {
  const { row, col } = coord;

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

let arr1 = [
  ['3', '.', '6', '5', '.', '8', '4', '.', '.'],
  ['5', '2', '.', '.', '.', '.', '.', '.', '.'],
  ['.', '8', '7', '.', '.', '.', '.', '3', '1'],
  ['.', '.', '3', '.', '1', '.', '.', '8', '.'],
  ['9', '.', '.', '8', '6', '3', '.', '.', '5'],
  ['.', '5', '.', '.', '9', '.', '6', '.', '.'],
  ['1', '3', '.', '.', '.', '.', '2', '5', '.'],
  ['.', '.', '.', '.', '.', '.', '.', '7', '4'],
  ['.', '.', '5', '2', '.', '6', '3', '.', '.']
]

let hasSolution = solveSudoku(arr1);
console.log(hasSolution);

