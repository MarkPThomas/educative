class UnionFind {
  constructor(N) {
    this.parent = [];
    for (let i = 0; i < N; i++) {
      this.parent.push(i);
    }
  }

  find(x) {
    if (this.parent[x] != x) {
      this.parent[x] = this.find(this.parent[x]);
    }
    return this.parent[x];
  }

  union(x, y) {
    let xr = this.find(x);
    let yr = this.find(y);
    this.parent[xr] = yr;
  }
}

export default UnionFind