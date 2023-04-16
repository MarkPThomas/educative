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

// function isInBox(row, col, usedCoord) {
//   const colMin = usedCoord.col - usedCoord.col % BLOCK_COLS;
//   const colMax = usedCoord.col - usedCoord.col % BLOCK_COLS + BLOCK_COLS;
//   const rowMin = usedCoord.row - usedCoord.row % BLOCK_ROWS;
//   const rowMax = usedCoord.row - usedCoord.row % BLOCK_ROWS + BLOCK_ROWS;

//   return (colMin <= col && col < colMax && rowMin <= row && row < rowMax);
// }

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

    // // Include box occurrences
    // const potentialColsReduced = {};
    // potentialRows.forEach((row) => {
    //   potentialColsReduced[row] = [];
    //   potentialCols.forEach((col) => {
    //     let isUsedInBox = false;
    //     for (let i = 0; i < usedCoords.length; i++) {
    //       if (isInBox(row, col, usedCoords[i])) {
    //         isUsedInBox = true;
    //         break;
    //       }
    //     }
    //     if (!isUsedInBox) {
    //       potentialColsReduced[row].push(col);
    //     }
    //   })
    // });

    // For any coords without pre-filled values for the current digit:
    if (!unusedCoordsByDigit.hasOwnProperty(digit)) {
      unusedCoordsByDigit[digit] = {};
    }
    for (let potentialRow of potentialRows) {
      for (let potentialCol of potentialCols) {
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

let arr = [
  [3, 0, 6, 5, 0, 8, 4, 0, 0],
  [5, 2, 0, 0, 0, 0, 0, 0, 0],
  [0, 8, 7, 0, 0, 0, 0, 3, 1],
  [0, 0, 3, 0, 1, 0, 0, 8, 0],
  [9, 0, 0, 8, 6, 3, 0, 0, 5],
  [0, 5, 0, 0, 9, 0, 6, 0, 0],
  [1, 3, 0, 0, 0, 0, 2, 5, 0],
  [0, 0, 0, 0, 0, 0, 0, 7, 4],
  [0, 0, 5, 2, 0, 6, 3, 0, 0]
]

// Position of the starting elements in the arr
// pos = {
//	 value: [[row_i, col_i],...]
// }
// where value = 1-9
// This records by value key the cells where it is already used
let pos = {};

// Count of the remaining number of times a give value can be placed
// Each value occurs 1 time for each of the 9 rows
// So start at 9 & count down for each occurrence
// rem = {
//	 value: pending count
// }
// where value = 1-9
// Sort the rem map in order to start with smaller number of a given value to be filled first. Optimization for pruning
let rem = {};

// Graph defining tentative positions of the elements to be filled
// These are accessed in order of values in sorted rem object
// graph = {
//	 value: {
//		 unfilledRow1: [unfilled columns],
//		 unfilledRow2: [unfilled columns]
//	 }
// }
// where value = 1-9
let graph = {};


// Print the matrix array
function printMatrix(arr) {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      process.stdout.write(arr[i][j] + " ");
    }
    console.log();
  }
}


// Method to check if the inserted element is safe
function is_safe(x, y) {
  let key = arr[x][y];
  for (let i = 0; i < 9; i++) {
    if (i !== y && arr[x][i] === key) {
      return false;
    }
    if (i !== x && arr[i][y] === key) {
      return false;
    }
  }

  let r_start = Math.floor(x / 3) * 3;
  let r_end = r_start + 3;

  let c_start = Math.floor(y / 3) * 3;
  let c_end = c_start + 3;

  for (let i = r_start; i < r_end; i++) {
    for (let j = c_start; j < c_end; j++) {
      if (i !== x && j !== y && arr[i][j] === key) {
        return false;
      }
    }
  }
  return true;
}

// method to fill the matrix
// input
//        keys: list of elements to be filled in the matrix
//        k   : index number of the element to be picked up from keys
//        rows: list of row index where element is to be inserted
//        r   : index number of the row to be inserted
//
function fill_matrix(k, keys, r, rows) {
  for (let c of graph[keys[k]][rows[r]]) {
    if (arr[rows[r]] > 0) {
      continue;
    }
    arr[rows[r]] = keys[k];
    if (is_safe(rows[r], c)) {
      if (r < rows.length - 1) {
        if (fill_matrix(k, keys, r + 1, rows)) {
          return true;
        } else {
          arr[rows[r]] = 0;
          continue;
        }
      } else {
        if (k < keys.length - 1) {
          if (fill_matrix(k + 1, keys, 0, list(graph[keys[k + 1]].keys()))) {
            return true;
          } else {
            arr[rows[r]] = 0;
            continue;
          }
        }
        return true;
      }
    }
    arr[rows[r]] = 0;
  }
  return false;
}


// Fill the pos and rem dictionary. It will be used to build graph
function build_pos_and_rem() {
  for (let i = 0; i < 9; i++) {
    for (let j = 0; j < 9; j++) {
      if (arr[i][j] > 0) {
        if (!pos.hasOwnProperty(arr[i][j])) {
          pos[arr[i][j]] = [];
        }
        pos[arr[i][j]].push([i, j]);
        if (!rem.hasOwnProperty(arr[i][j])) {
          rem[arr[i][j]] = 9;
        }
        rem[arr[i][j]] -= 1;
      }
    }
  }

  // Fill the elements not present in input matrix. Example: 1 is missing in input matrix
  for (let i = 1; i < 10; i++) {
    if (!pos.hasOwnProperty(i)) {
      pos[i] = [];
    }
    if (!rem.hasOwnProperty(i)) {
      rem[i] = 9;
    }
  }
}

// Build the graph
function build_graph() {
  for (let [k, v] of Object.entries(pos)) {
    if (!graph.hasOwnProperty(k)) {
      graph[k] = {};
    }

    let row = [...Array(9).keys()];
    let col = [...Array(9).keys()];

    for (let cord of v) {
      row.splice(row.indexOf(cord[0]), 1);
      col.splice(col.indexOf(cord[1]), 1);
    }

    if (row.length === 0 || col.length === 0) {
      continue;
    }

    for (let r of row) {
      for (let c of col) {
        if (arr[r] === 0) {
          if (!graph[k].hasOwnProperty(r)) {
            graph[k][r] = [];
          }
          graph[k][r].push(c);
        }
      }
    }
  }
}

// build_pos_and_rem();

// // Sort the rem map in order to start with smaller number of elements to be filled first. Optimization for pruning
// rem = Object.fromEntries(Object.entries(rem).sort((a, b) => a[1] - b[1]));

// build_graph();

// let key_s = Object.keys(rem);
// // Util called to fill the matrix
// fill_matrix(0, key_s, 0, Object.keys(graph[key_s[0]]));



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

solveSudoku(arr1)

