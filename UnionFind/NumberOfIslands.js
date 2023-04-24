// Given an (m×n) 2-D binary grid representing a map of 1s and 0s, where 1 represents land and 0 represents water,
// we have to return the number of islands.

// An island is constructed by linking neighboring areas of land horizontally and vertically.

// Constraints:
// The grid only consists of 0s or 1s.
// 1 ≤ grid[i].length ≤ 300

// T: O(m*n)
// S: O(m*n)
// where m = grid width, n = grid height
import UnionFind from './union_find_islands.js'

function numIslands(grid) {
  if (!grid) {
    return 0;
  }

  let unionFind = new UnionFind(grid)
  let parentArray = unionFind.parent;
  let count = unionFind.getCount();

  return [parentArray, count]
}

class UnionFind {

  // Initializing the parent list and count variable by traversing the grid
  constructor(grid) {
    this.parent = [];
    this.rank = [];
    this.count = 0;
    let m = grid.length;
    let n = grid[0].length;

    for (let i = 0; i < m; i++) {
      for (let j = 0; j < n; j++) {
        if (grid[i][j] == "1") {
          this.parent.push(i * n + j);
          this.count += 1;
        } else {
          this.parent.push(-1);
        }
        this.rank.push(0);
      }
    }
  }

  // Function to find the root parent of a node
  find(i) {
    if (this.parent[i] != i) {
      this.parent[i] = this.find(this.parent[i]);
    }
    return this.parent[i];
  }


  // Function to connect components
  union(x, y) {
    let rootX = this.find(x);
    let rootY = this.find(y);
    if (rootX != rootY) {
      if (this.rank[rootX] > this.rank[rootY]) {
        this.parent[rootY] = rootX;
      } else if (this.rank[rootX] < this.rank[rootY]) {
        this.parent[rootX] = rootY;
      } else {
        this.parent[rootY] = rootX;
        this.rank[rootX] += 1;
      }

      this.count -= 1;
    }

  }

  // Function to return the number of conencted components consisting of "1"s
  getCount() {
    return this.count;
  }
}

// Driver code
function main() {
  // Example grids
  let grid1 = [
    ['1', '1', '1'],
    ['0', '1', '0'],
    ['1', '0', '0'],
    ['1', '0', '1']
  ];

  let grid2 = [
    ['1', '1', '1', '1', '0'],
    ['1', '0', '0', '0', '1'],
    ['1', '0', '0', '1', '1'],
    ['0', '1', '0', '1', '0'],
    ['1', '1', '0', '1', '1']
  ];

  let grid3 = [
    ['1', '1', '1', '1', '0'],
    ['1', '0', '0', '0', '1'],
    ['1', '1', '1', '1', '1'],
    ['0', '1', '0', '1', '0'],
    ['1', '1', '0', '1', '1']
  ];

  let grid4 = [
    ['1', '0', '1', '0', '1'],
    ['0', '1', '0', '1', '0'],
    ['1', '0', '1', '0', '1'],
    ['0', '1', '0', '1', '0'],
    ['1', '0', '1', '0', '1']
  ];

  let grid5 = [
    ['1', '0', '1'],
    ['0', '0', '0'],
    ['1', '0', '1']
  ];

  let inputs = [grid1, grid2, grid3, grid4, grid5];

  for (let k = 0; k < inputs.length; k++) {
    let i = inputs[k];
    let result = numIslands(i);
    console.log('\n\tParent array : [', numIslands(i)[0].toString(), ']'
      , '\n\tNumber of 1s :', numIslands(i)[1]);
  }
}

main()