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

export default UnionFind