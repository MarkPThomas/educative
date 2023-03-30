// Given a binary tree, return its zigzag level order traversal.

// The zigzag level order traversal corresponds to traversing nodes from left to right for one level,
// and then right to left for the next level, and so on, reversing direction after every level.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

// You can use the template for BFS given in tree_bfs.js

export function zigzagLevelOrder(root) {
  const output = [];
  if (!root) {
    return output;
  }

  let reverseOrder = false;
  const queue = [root];
  while (queue.length) {
    const currentRowLength = queue.length;
    const row = [];

    for (let i = 0; i < currentRowLength; i++) {
      if (reverseOrder) {
        let node = queue.pop();
        row.push(node.data);

        if (node.right) {
          queue.unshift(node.right);
        }
        if (node.left) {
          queue.unshift(node.left);
        }
      } else {
        let node = queue.shift();
        row.push(node.data);

        if (node.left) {
          queue.push(node.left);
        }
        if (node.right) {
          queue.push(node.right);
        }
      }
    }

    output.push(row);
    reverseOrder = !reverseOrder;
  }

  return output;
}