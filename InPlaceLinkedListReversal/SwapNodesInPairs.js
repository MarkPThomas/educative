// Given a singly linked list, swap every two adjacent nodes of the linked list.

// After the swap, return the head of the linked list.

// Note: Solve the problem without modifying the values in the list’s nodes.

// In other words, only the nodes themselves can be changed.

import LinkedList from "./linked_list.js"
import LinkedListNode from "./linked_list_node.js"
import traverseLinkedList from "./linked_list_traversal.js"
import reverseLinkedList from "./linked_list_reversal.js"

export function swapPairs(head) {
  let nodeA = head;
  let nodeB = head.next;
  if (nodeB) {
    head = nodeB;
  }
  let prevNode = null;

  while (nodeA && nodeB) {
    let nextNode = nodeB.next;

    nodeA.next = nextNode;
    nodeB.next = nodeA;
    if (prevNode) {
      prevNode.next = nodeB;
    }

    prevNode = nodeA;
    nodeA = nextNode;
    nodeB = nodeA?.next;
  }

  return head;
}