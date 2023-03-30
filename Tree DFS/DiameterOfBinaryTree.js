// Given a binary tree, you need to compute the length of the tree’s diameter.

// The diameter of a binary tree is the length of the longest path between any two nodes in a tree.

// This path may or may not pass through the root.

// Note: The length of the path between two nodes is represented by the number of edges between them.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

export function diameterOfBinaryTree(root) {
  return nodeData(root).diameter;
}

function nodeData(root) {
  if (root === null) {
    return { height: 0, diameter: 0 };
  }

  const leftBranch = nodeData(root.left);
  const rightBranch = nodeData(root.right);

  const height = Math.max(leftBranch.height, rightBranch.height) + 1;

  const currentDiameter = leftBranch.height + rightBranch.height;
  const diameter = Math.max(
    leftBranch.diameter, rightBranch.diameter, currentDiameter
  );

  return { height, diameter };
}