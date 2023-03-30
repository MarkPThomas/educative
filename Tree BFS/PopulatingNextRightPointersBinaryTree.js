// Given a binary tree, connect all nodes of the same hierarchical level.

// We need to connect them from left to right, so that the next pointer of each node points to the node on its
// immediate right.

// The next pointer of the right-most node at each level will be NULL.

// For this problem, each node in the binary tree has one additional pointer (the next pointer) along with the
// left and right pointers.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

// Function to populate same level pointers
function populateNextPointers(node) {
  // Initialize root node's children
  connectNodeChildren(node);
  let nextRowStart = getLeftMostChild(node);

  while (nextRowStart) {
    connectRowChildren(nextRowStart);
    nextRowStart = getLeftMostChild(nextRowStart);
  }

  return node;
}

function getLeftMostChild(node) {
  do {
    if (node.left) {
      return node.left;
    }
    if (node.right) {
      return node.right;
    }
    node = node.next;
  } while (node);

  return null;
}

function connectRowChildren(node) {
  let priorChild = null;
  while (node) {
    connectNodeChildren(node, priorChild);

    if (node.right) {
      priorChild = node.right;
    } else if (node.left) {
      priorChild = node.left;
    }
    node = node.next;
  }
}

function connectNodeChildren(node, priorChild) {
  if (node.left && node.right) {
    node.left.next = node.right;
  }
  if (priorChild) {
    if (node.left) {
      priorChild.next = node.left;
    } else if (node.right) {
      priorChild.next = node.right;
    }
  }
}

// Do not modify the code below
// Function to find the given node and return its next node
function getNextNode(node, nodeData) {
  // Performing Binary Search
  while (node != null && nodeData != node.data) {
    if (nodeData < node.data) {
      node = node.left;
    } else {
      node = node.right;
    }
  }

  // If node is not found return -1 else return its next node
  if (node == null) {
    let nonExistingNode = new BinaryTreeNode(-1);
    return nonExistingNode;
  } else {
    return node.next;
  }
};

export { populateNextPointers, getNextNode };