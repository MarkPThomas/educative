// Given the root node of a binary search tree and an integer value k,
// return the kth smallest value from all the nodes of the tree.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

const orderedValues = [];

export function kthSmallestElement(root, k) {
  inOrderElements(root);
  return orderedValues.length >= k ? orderedValues[k - 1] : Infinity;
}

function inOrderElements(root) {
  if (root) {
    inOrderElements(root.left);
    orderedValues.push(root.data);
    inOrderElements(root.right);
  }
  return;
}