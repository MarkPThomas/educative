// Given the head of a singly linked list, reorder the list as if it were folded on itself.

// For example, if the list is represented as follows:

// L 0 → L 1 → L 2 → … → L n−2 → L n−1 → L n

// This is how you’ll reorder it:

// L 0 → L n → L 1 → L n−1 → L 2 → L n−2 → …

// You don’t need to modify the values in the list’s nodes; only the links between nodes need to be changed.

import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";

export function reorderList(head) {
  if (head === null || head.next === null) {
    return head;
  }
  const middleNode = splitAtMiddleNode(head);
  const headAlt = reverse(middleNode);

  let currNodeA = head;
  let currNodeB = headAlt;
  while (currNodeB) {
    let nextNodeA = currNodeA?.next;
    if (currNodeA) {
      currNodeA.next = currNodeB;
    }

    let nextNodeB = currNodeB?.next;
    if (nextNodeA) {
      currNodeB.next = nextNodeA;
    }

    currNodeB = nextNodeB;
    currNodeA = nextNodeA;
  }

  return head;
}

function splitAtMiddleNode(head) {
  let endPtr = head;
  let middlePtr = head;
  let preMiddlePtr = null;
  while (endPtr && endPtr.next) {
    middlePtr = middlePtr.next;
    endPtr = endPtr.next.next;
    if (preMiddlePtr) {
      preMiddlePtr = preMiddlePtr.next;
    } else {
      preMiddlePtr = head;
    }
  }
  // Disconnect lists
  preMiddlePtr.next = null;

  return middlePtr;
}

function reverse(head) {
  let prevNode = null;
  let currNode = head;
  while (currNode) {
    let nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
  }
  return prevNode;
}