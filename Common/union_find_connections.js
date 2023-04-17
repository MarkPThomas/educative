class UnionFind {

  constructor(N) {
    // intializing parent and rank lists
    this.parent = []
    this.rank = new Array(N + 1).fill(0);
    for (let i = 0; i <= N; i++) {
      this.parent.push(i)
    }
  }

  findParent(x) {
    if (this.parent[x] != x) {
      this.parent[x] = this.findParent(this.parent[x])
    }
    return this.parent[x]
  }

  union(x, y) {
    const xr = this.findParent(x)
    const yr = this.findParent(y)
    this.parent[xr] = yr
  }
}

export default UnionFind