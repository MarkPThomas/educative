// Given the root of a binary tree, flatten the tree into a linked list using the same Tree class.

// The left child of the linked list is always NULL, and the right child points to the next node in the list.

// The nodes in the linked list should be in the same order as the preorder traversal of the given binary tree.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

// LinkedList form:
// Ultimately set all .left = null
// Ultimately treat all .right ~ .next

export function flattenTree(root) {
  if (root === null) {
    return;
  }

  let current = root;
  while (current) {
    if (current.left) {
      let last = current.left;
      // Get rightmost node of left branch
      while (last.right) {
        last = last.right;
      }
      last.right = current.right;
      current.right = current.left;
      current.left = null;
    }
    // Advance on new reference
    current = current.right;
  }

  return root;
}
