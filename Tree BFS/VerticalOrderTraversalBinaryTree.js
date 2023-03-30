// Find the vertical order traversal of a binary tree when the root of the binary tree is given.

// In other words, return the values of the nodes from top to bottom in each column, column by column from left to right.

// If there is more than one node in the same column and row, return the values from left to right.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

export function verticalOrder(root) {
  const queue = [[root, 0]];
  function addToQueue(node, index) {
    queue.push([node, index]);
  }

  const nodeColumns = {};
  function addToNodeColumns(data, index) {
    nodeColumns[index]
      ? nodeColumns[index].push(data)
      : nodeColumns[index] = [data];
  }
  let minIndex = 0;
  let maxIndex = 0;

  while (queue.length) {
    const [node, currentIndex] = queue.shift();
    addToNodeColumns(node.data, currentIndex);

    if (node.left) {
      const index = currentIndex - 1;
      addToQueue(node.left, index);
      minIndex = Math.min(minIndex, index);
    }

    if (node.right) {
      const index = currentIndex + 1;
      addToQueue(node.right, index);
      maxIndex = Math.max(maxIndex, index);
    }
  }

  const nodeValues = [];
  for (let i = minIndex; i <= maxIndex; i++) {
    nodeValues.push(nodeColumns[i]);
  }

  return nodeValues;
}