// Given the root node of a binary tree, convert the binary tree into its mirror image.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

export function mirrorBinaryTree(root) {
  if (!root) {
    return;
  }

  mirrorBinaryTree(root.left);
  mirrorBinaryTree(root.right);

  const leftBranch = root.left;
  root.left = root.right;
  root.right = leftBranch;

  return root;
}