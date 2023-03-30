// Given the root of a binary tree, return the maximum sum of any non-empty path.

// A path in a binary tree is defined as follows:

// A sequence of nodes in which each pair of adjacent nodes must have an edge connecting them.

// A node can only be included in a path once at most.

// Including the root in the path is not compulsory.

// You can calculate the path sum by adding up all node values in the path.

// To solve this problem, calculate the maximum path sum given the root of a binary tree so that there won’t be any
// greater path than it in the tree.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

let maxSum = Infinity * -1;

export function maxPathSum(root) {
  maxPathSumParts(root);
  return maxSum;
}

function maxPathSumParts(root) {
  if (!root) {
    return 0;
  }

  const leftSum = root.left ? maxPathSumParts(root.left) : 0;
  const rightSum = root.right ? maxPathSumParts(root.right) : 0;

  const partMaxSum = root.data + Math.max(leftSum, rightSum);
  const subTreeMax = root.data + leftSum + rightSum;

  maxSum = Math.max(maxSum, partMaxSum, subTreeMax);
  return partMaxSum;
}