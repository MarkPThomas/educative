// You’ve joined a group of robbers and need to help them with their next heist.

// Since you’re the brains behind the operation, it is our responsibility to ensure that the profit is maximized,
// considering the amount of risk our allies will take.

// You’ve devised a well-crafted plan and have realized that if any two adjacent houses are robbed, the robbery will fail,
// and police will catch us and our allies.

// Therefore, we must take a path through the neighborhood to ensure maximum profit and safety.

// You arranged all of the houses in this neighborhood in a binary tree and called the first house near us the root.

// The children of each node represent the neighbors of that house.

import { dfsTree } from "./tree_dfs.js";
import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

export function rob(root) {
  const result = robDFS(root);

  // Case 1: Rob root
  const lootRobRoot = root.data + (result[1] === 0 ? 0 : Math.max(...result));

  // Case 2: Skip root
  const lootRobLeftChild = result[1] + root.left ? root.left.data : 0;
  const lootRobRightChild = result[1] + root.right ? root.right.data : 0;
  const lootRobRootChildren = lootRobLeftChild + lootRobRightChild;

  return Math.max(lootRobRoot, lootRobRootChildren);
}

function robDFS(node) {
  if (!node) {
    return [0, 0];
  }

  const lootLeft = robDFS(node.left);
  const lootRight = robDFS(node.right);

  // Case 1: Rob children
  const lootRobLeftChild = lootLeft[1] + node.left ? node.left.data : 0;
  const lootRobRightChild = lootRight[1] + node.right ? node.right.data : 0;
  const lootRobChildren = lootRobLeftChild + lootRobRightChild;

  // Case 2: Skip children
  const lootRobGrandchildren = Math.max(...lootLeft) + Math.max(...lootRight);

  return [lootRobChildren, lootRobGrandchildren];
}