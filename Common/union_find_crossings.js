class UnionFind {
  // Initialise the 1D array
  constructor(n) {
    this.parents = new Array();
    for (let i = 0; i < n; i++) {
      this.parents.push(i);
    }
  }

  // Find parent of an index
  find(x) {
    // find parent if itself is not a parent
    console.log("\tUpdated array after finding the parent of", x, this.parents);
    if (this.parents[x] != x) {
      this.parents[x] = this.find(this.parents[x]);
    }
    return this.parents[x];
  }

  // Connecting two cells
  union(x, y) {
    this.parents[this.find(x)] = this.find(y);
    console.log("\tUpdated array after connecting cells :", this.parents);
  }

  // Mapping 2D array to 1D array to perform union find operations
  findIndex(x, y, col) {
    // +1 because starting from index 0
    return x * col + (y + 1);
  }
}

export default UnionFind;