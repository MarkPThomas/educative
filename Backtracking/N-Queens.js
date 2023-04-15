// Given a chessboard of size n×n, determine how many ways n queens can be placed on the board,
// such that no two queens attack each other.

// A queen can move horizontally, vertically, and diagonally on a chessboard.

// One queen can be attacked by another queen if both share the same row, column, or diagonal.

// Constraints:
// 1 ≤ n ≤ 9


// T: O(n^n)
// S: O(n)
// where n = board dimension
export function solveNQueens(n) {
  // For n queens in an nxn board, there are:
  // 1. 1 queen for each row
  // 2. 1 queen for each column
  // 3. x solutions, where x < n as no every column on a row is valid
  //
  // Solution stack can be simplified by assuming
  //  index = row, value = valid column

  const solutions = [];
  const solution = [];
  let row = 0;
  let col = 0;
  // 1. We can work from the top down, placing a piece on each row
  while (row < n) {
    // 2. Work out which column is valid
    while (col < n) {
      if (isValidMove(row, col, solution)) {
        solution.push(col);
        row++;
        col = 0;
        break;
      } else {
        col++;
      }
    }

    if (col === n) {
      if (solution.length) {
        // 3. If no valid column exists, back up the path to try out the next
        //   column on an earlier row and work forward to see if a
        //   complete solution can be reached.
        row--;
        col = solution.pop() + 1;
      } else {
        break;
      }
    }

    // 4. Once a valid solution is reached back up the path
    //   and try finding a solution for the next column location.
    if (row === n) {
      solutions.push([...solution]);
      row--;
      col = solution.pop() + 1;
    }
  }

  return solutions.length;
}

function isValidMove(proposedRow, proposedCol, solution) {
  // Only need to check board for existing pieces,
  //   which lie on all rows above the current row.
  for (let row = 0; row < proposedRow; row++) {
    const col = solution[row];
    const diagonalOffset = proposedRow - row;

    if (proposedCol === col
      || proposedCol === col - diagonalOffset
      || proposedCol === col + diagonalOffset) {
      return false;
    }
  }
  return true;
}