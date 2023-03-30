// Given the root of a binary tree, return its maximum depth.
// A binary tree’s maximum depth is the number of nodes along the longest path from the root node down to the farthest leaf node.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

export function maxDepth(root) {
  return depth(root, 0);
}

function depth(node, counter) {
  if (!node) {
    return counter;
  }

  const depthLeft = depth(node.left, counter);
  const depthRight = depth(node.right, counter);

  return 1 + Math.max(depthLeft, depthRight);
}