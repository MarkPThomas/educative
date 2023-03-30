// The task is to connect all nodes in a binary tree.

// Connect them from left to right so that the next pointer of each node points to the node on its immediate right.

// The next pointer of the right-most node at each level should point to the first node of the next level in the tree.

// Each node in the given binary tree for this problem includes a next pointer, along with the left and right pointers.

// Your solution must set the next pointer to connect the same level nodes to each other and across levels.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

// Tip: You may use some of the code templates provided
// in the support files

// Function to populate same level pointers
export function populateNextPointers(root) {
  // initialize root
  connectNodeChildren(root);
  let leftMostChild = getLeftMostChild(root);
  connectToNextRow(root, leftMostChild);


  while (leftMostChild) {
    const rightMostNode = connectRowChildren(leftMostChild);
    leftMostChild = getLeftMostChild(leftMostChild);
    connectToNextRow(rightMostNode, leftMostChild)
  }
}

function getLeftMostChild(node) {
  while (node) {
    if (node.left) {
      return node.left;
    }
    if (node.right) {
      return node.right;
    }
    node = node.next;
  }
}

function connectNodeChildren(node, lastChild) {
  if (node.left && node.right) {
    node.left.next = node.right
  }

  if (lastChild) {
    if (node.left) {
      lastChild.next = node.left;
    } else if (node.right) {
      lastChild.next = node.right;
    }
  }

  return node.right ? node.right : node.left;
}

function connectRowChildren(node) {
  let lastNode = null;
  let lastChild = null;
  while (node) {
    const currentLastChild = connectNodeChildren(node, lastChild);
    if (currentLastChild) {
      lastChild = currentLastChild;
    }

    lastNode = node;
    node = node.next;
  }
  return lastNode;
}

function connectToNextRow(rightMostNode, leftMostChild) {
  if (rightMostNode && leftMostChild) {
    rightMostNode.next = leftMostChild;
  }
}

// Do not modify the code below
// Function to find the given node and return its next node
export function getNextNode(node, nodeData) {
  // Performing Binary Search
  while (node != null && nodeData != node.data) {
    if (nodeData < node.data) node = node.left;
    else node = node.right;
  }

  // If node is not found return -1 else return its next node
  if (node == null) {
    let nonExistingNode = new BinaryTreeNode(-1);
    return nonExistingNode;
  } else return node.next;
}