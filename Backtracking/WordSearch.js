// Given an m×n 2-D grid of characters, we have to find a specific word in the grid by combining the adjacent characters.
// Assume that only up, down, right, and left neighbors are considered adjacent.

// Constraints:
// m = board.length
// n = board[i].length, where
// 0 ≤ i < m
// 1 ≤ m, n <= 6
// 1 ≤ word.length ≤ 15 board and word consist of only lowercase and uppercase English letters.

// The search is not case-sensitive.

export function wordSearch(grid, word) {
  if (!word.length) {
    return false;
  }

  const neighbors = new Adjacent(grid);
  let row = 0;
  let col = 0;

  // Search grid for first character
  while (row < grid.length) {
    while (col < grid[0].length) {
      // Begin path search
      if (grid[row][col] === word[0]
        && solutionFound(word, 0, row, col, neighbors)) {
        return true;
      }
      // Resume searching for next possible path
      col++;
    }
    col = 0;
    row++;
  }

  return false
}

function solutionFound(word, index, row, col, neighbors, path = []) {
  // Optimization: Rule out traveling in prior direction
  const priorMatch = path[path.length - 1];
  const deltaRow = priorMatch ? row - priorMatch[0] : 0;
  const deltaCol = priorMatch ? col - priorMatch[1] : 0;

  path.push([row, col, index]);

  index++;
  if (index === word.length) {
    return true;
  }

  if (deltaCol <= 0
    && neighbors.left(row, col) === word[index]
    && solutionFound(word, index, row, col - 1, neighbors, path)) {
    return true;
  }
  if (deltaCol >= 0
    && neighbors.right(row, col) === word[index]
    && solutionFound(word, index, row, col + 1, neighbors, path)) {
    return true;
  }
  if (deltaRow >= 0
    && neighbors.up(row, col) === word[index]
    && solutionFound(word, index, row + 1, col, neighbors, path)) {
    return true;
  }
  if (deltaRow <= 0
    && neighbors.down(row, col) === word[index]
    && solutionFound(word, index, row - 1, col, neighbors, path)) {
    return true;
  }
  path.pop();
  return false;
}

class Adjacent {
  constructor(grid) {
    this.grid = grid;
  }

  left(row, col) {
    return this.grid[row] ? this.grid[row][col - 1] : undefined;
  }

  right(row, col) {
    return this.grid[row] ? this.grid[row][col + 1] : undefined;
  }

  up(row, col) {
    return this.grid[row + 1] ? this.grid[row + 1][col] : undefined;
  }

  down(row, col) {
    return this.grid[row - 1] ? this.grid[row - 1][col] : undefined;
  }
}