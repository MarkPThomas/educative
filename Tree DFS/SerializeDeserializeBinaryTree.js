// Serialize a given binary tree to a file and deserialize it back to a tree.

// Make sure that the original and the deserialized trees are identical.

// Serialize: Write the tree to a file.

// Deserialize: Read from a file and reconstruct the tree in memory.

// Serialize the tree into a list of integers, and then, deserialize it back from the list to a tree.

// For simplicity’s sake, there’s no need to write the list to the files.

import { BinaryTree } from "./binary_tree.js";
import { BinaryTreeNode } from "./binary_tree_node.js";

const NULL_MARKER = 'NULL';

export function serialize(root) {
  return serializePreOrder(root, []);
}

function serializePreOrder(node, stream) {
  if (node === null || node.data === NULL_MARKER) {
    stream.push(NULL_MARKER);
    return stream;
  }

  stream.push(node.data);
  stream = serializePreOrder(node.left, stream);
  stream = serializePreOrder(node.right, stream);
  return stream;
}

export function deserialize(stream) {
  if (stream.length && stream[0] === NULL_MARKER) {
    return new BinaryTreeNode(NULL_MARKER);
  }

  // Reverse stream in order to use more efficient 'pop' rather than 'unshift'
  stream.reverse();

  return deserializePreOrder(stream);
}

function deserializePreOrder(stream) {
  if (stream.length === 0) {
    return null;
  }

  const data = stream.pop();
  if (data === NULL_MARKER) {
    return null;
  }
  const node = new BinaryTreeNode(data);
  node.left = deserializePreOrder(stream);
  node.right = deserializePreOrder(stream);

  return node;
}