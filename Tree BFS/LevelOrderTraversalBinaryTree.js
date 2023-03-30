// Given the root of a binary tree, display the values of its nodes while performing a level order traversal.

// Return the node values for all levels in a string separated by the character :.

// If the tree is empty, i.e., the number of nodes is 0, then return “None” as the output.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

const SENTRY = 'SENTRY';
const ROW_DIVIDER = ' : ';
const VALUE_DIVIDER = ', ';

export function levelOrderTraversal(root) {
  if (!root || !root.data) {
    return null;
  }

  // Use sentry node rather than maintaining 2 queues
  const output = [];
  const sentry = new BinaryTreeNode(SENTRY)
  const queue = [root, sentry];

  let currentRow = [];
  while (queue.length) {
    const node = queue.shift();
    if (node.data === SENTRY) {
      output.push(currentRow.join(VALUE_DIVIDER));
      if (queue.length) {
        currentRow = [];
        queue.push(node);
      }
    } else {
      currentRow.push(node.data);
      if (node.left) {
        queue.push(node.left);
      }
      if (node.right) {
        queue.push(node.right);
      }
    }
  }

  return output.join(ROW_DIVIDER);
}