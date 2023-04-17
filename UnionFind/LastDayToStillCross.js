// You are given a 1-based m×n matrix where 0 represents land and 1 represents water.

// You’re also given a 2-D array of cells which represent that each day, a new cell is flooded with water.

// On day 0, the whole grid is land.

// The task is to find the last day when you can walk from the top row to the bottom row using only land cells.

// Constraints:
// 2 ≤ row, col ≤ 2×10^4
// cells.length == row × col
// 1 ≤ r
// i ≤ row
// 1 ≤ c
// i ≤ col
// All the values of cells are unique.
// Note: Remember that in the grid you can move up, down, left, and right.

// T: O((m * n) * a(m * n)) -> O(m * n * 4) -> O(m * n)
// S: O(m * n)
// where m = # cols in a row, n = # of squares filled with water in 'cells' provided -> rows in the region if a path is assumed to be broken
//       a = inverse Ackermann function, a very slow-growing function -> 4
// NOTE: Normal brute force by using backtracking results in a time-complexity of T: O(4 * k * n * m^2) -> O(n^2 * m^2! 4 =  # of directions to move in grid, k = # days

// Note: Files will not work with imports like this. Either bring in the structure or make this a module first!!!!
import UnionFind from '../Common/union_find_crossings.js'

function lastDayToCross(row, col, cells) {
  const LAND = 0;
  const WATER = 1;
  const NEIGHBORS = [
    { row: 0, col: -1 },
    { row: 0, col: 1 },
    { row: 1, col: 0 },
    { row: -1, col: 0 }
  ];
  // +2 to create a starting & ending node outside the array
  const LENGTH_1D_ARRAY = row * col + 2;

  const region = new Array(row);
  for (let regionRow = 0; regionRow < row; regionRow++) {
    region[regionRow] = new Array(col).fill(WATER);
  }

  const land = new UnionFind(LENGTH_1D_ARRAY);

  // For simplicity/efficiency, start with all water and reverse cell effects
  //    joining any land added until start & end nodes can first be connected
  // Since region initially starts as all land, last day crossed is
  //    at the first day crossed from the other direction = cells index
  for (let lastDay = cells.length - 1; lastDay >= 0; lastDay--) {
    // Get land coord & offset back by 1 for 0-based index
    let [newLandRow, newLandCol] = cells[lastDay];
    newLandRow--;
    newLandCol--;

    addLand(newLandRow, newLandCol);
    connectLand(newLandRow, newLandCol)

    if (canCross()) {
      return lastDay;
    }
  }

  function addLand(row, col) {
    region[row][col] = LAND;
  }

  function connectLand(row, col) {
    tryNeighborConnections(row, col);
    tryStartConnection(row, col);
    tryEndConnection(row, col);
  }

  function tryNeighborConnections(row, col) {
    NEIGHBORS.forEach((neighbor) => {
      const neighborRow = row + neighbor.row;
      const neighborCol = col + neighbor.col;

      if (isInBounds(neighborRow, neighborCol)
        && region[neighborRow][neighborCol] === LAND) {
        join(neighborRow, neighborCol, row, col);
      }
    })
  }

  function isInBounds(row, col) {
    return (
      0 <= row && row < region.length
      && 0 <= col && col < region[row].length
    );
  }

  function tryStartConnection(row, col) {
    if (row === 0) {
      join(row, col, row, -1);
    }
  }

  function tryEndConnection(row, col) {
    if (row === region.length - 1) {
      join(row, col, row, region[row].length);
    }
  }

  function join(childRow, childCol, row, col) {
    const regionWidth = region[row].length;
    const childIndex = land.findIndex(childRow, childCol, regionWidth);
    const parentIndex = land.findIndex(row, col, regionWidth);
    land.union(childIndex, parentIndex);
  }

  function canCross() {
    const startParent = land.find(0);
    const endParent = land.find(LENGTH_1D_ARRAY - 1);
    return startParent === endParent;
  }
}

let result = lastDayToCross(2, 2, [[1, 1], [1, 2], [2, 1], [2, 2]]);
let expectedResult = 1;