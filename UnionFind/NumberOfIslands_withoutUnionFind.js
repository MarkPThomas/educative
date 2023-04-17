// Given an (m×n) 2-D binary grid representing a map of 1s and 0s, where 1 represents land and 0 represents water,
// we have to return the number of islands.

// An island is constructed by linking neighboring areas of land horizontally and vertically.

// Constraints:
// The grid only consists of 0s or 1s.
// 1 ≤ grid[i].length ≤ 300

// T: O(m*n)
// S: O(m*n)
// where m = grid width, n = grid height

function numIslands(grid) {
  let count = 0;
  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] == 1) {
        count++;
      }
    }
  }

  for (let row = 0; row < grid.length; row++) {
    for (let col = 0; col < grid[row].length; col++) {
      if (grid[row][col] == 1) {
        const left = col - 1;
        if (left > 0 && grid[row][left] == 1) {
          count--;
        }

        const right = col + 1;
        if (right < grid[row].length && grid[row][right] == 1) {
          count--;
        }

        const up = row - 1;
        if (up > 0 && grid[up][col] == 1) {
          count--;
        }

        const down = row + 1;
        if (down < grid.length && grid[down][col] == 1) {
          count--;
        }
        grid[row][col] = 0;
      }
    }
  }

  return count;
}