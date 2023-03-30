// You’re given the head of a singly linked list with n nodes and two positive integers,
// left and right.

// Our task is to reverse the list’s nodes from position left to position right and
// return the reversed list.

import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";
import traverseLinkedList from "./linked_list_traversal.js";
import reverseLinkedList from "./linked_list_reversal.js";

function reverse(head, k) {
  let count = 0;
  let prevNode = null;
  let currNode = head;
  while (count < k && currNode) {
    let nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
    count++;
  }
  return {
    reversedHeadNode: prevNode,
    reversedTailNode: head
  };
}

function getNodeN(head, n) {
  if (n < 1) {
    return null;
  }
  let count = 1;
  let nodeN = head;
  while (count < n && nodeN) {
    nodeN = nodeN.next;
    count++;
  }
  return nodeN;
}

export function reverseBetween(head, left, right) {
  const k = right - left + 1;

  const previousLastNode = getNodeN(head, left - 1);
  const nextFirstNode = getNodeN(head, right + 1);

  const leftNode = getNodeN(head, left);
  const { reversedHeadNode, reversedTailNode } = reverse(leftNode, k);

  // Connect left & right sides
  if (left > 1) {
    previousLastNode.next = reversedHeadNode;
  } else {
    head = reversedHeadNode;
  }
  reversedTailNode.next = nextFirstNode;

  return head;
}
