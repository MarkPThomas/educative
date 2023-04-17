// We’re given a graph that is actually a tree with n nodes labeled from 1 to n, plus one additional edge.

// The additional edge connects two different vertices and is not a duplicate of an existing edge.

// The graph is represented as an array called edges of length n where edges[i] = [a, b] indicates that there is an edge between
// nodes a and b in the graph.

// Return an edge that can be removed so that the resulting graph is a tree of n nodes.

// If there are multiple candidates for removal, return the edge that occurs last in edges.

// Constraints:

// n = edges.length
// 3 ≤ n ≤ 1000

// edges[i].length = 2
// 1 ≤ a < b ≤ n
// a ≠ b

// There are no repeated edges.
// The given graph is connected.

// T: O(n)
// S: O(n)
// where n = # edges
import UnionFind from './union_find.js'

export function redundantConnection(edges) {
  const connections = new UnionFind(edges.length);

  for (let i = 0; i < edges.length; i++) {
    const edge = edges[i];
    const parentI = connections.findParent(edge[0]);
    const parentJ = connections.findParent(edge[1]);

    if (parentI === parentJ) {
      return edge;
    }
    connections.union(edge[0], edge[1]);
  }

  return [];
}