// There are a total of n classes labeled with the English alphabet (A, B, C, and so on).

// Some classes are dependent on other classes for compilation.

// For example, if class B extends class A, then B has a dependency on A.

// Therefore, A must be compiled before B.

// Given a list of the dependency pairs, find the order in which the classes should be compiled.

// Constraints:
// Class name should be a character.

// 0 ≤ dependencies.length ≤ 5000 dependencies[i].length = 2

// All dependency pairs should be unique.

import Queue from './Queue.js';

export function findCompilationOrder(dependencies) {
  const graph = {};
  const inDegree = {};
  initializeAndPopulate(dependencies, graph, inDegree);

  const nodes = Object.keys(graph);
  const source = new Queue();
  updateSource(nodes, inDegree, source);

  const sortedOrder = [];
  while (!source.isEmpty) {
    const node = source.dequeue();
    visitNode(node, graph, inDegree, sortedOrder);
    updateSource(nodes, inDegree, source);
  }

  return sortedOrder;
}

function visitNode(parent, graph, inDegree, sortedOrder) {
  const children = graph[parent];
  children.forEach((child) => {
    inDegree[child]--;
  });

  // Visit node
  sortedOrder.push(parent);
}

function updateSource(nodes, inDegree, source) {
  nodes.forEach((node) => {
    if (!inDegree[node]) {
      source.enqueue(node);

      // Set to a count indicating soft delete
      inDegree[node]--;
    }
  });
}

function initializeAndPopulate(dependencies, graph, inDegree) {
  dependencies.forEach((x) => {
    const parent = x[1];
    const child = x[0];

    graph[parent] = [];
    graph[child] = [];
    inDegree[parent] = 0;
    inDegree[child] = 0;
  });

  dependencies.forEach((x) => {
    const parent = x[1];
    const child = x[0];

    graph[parent].push(child);
    inDegree[child]++;
  });
}