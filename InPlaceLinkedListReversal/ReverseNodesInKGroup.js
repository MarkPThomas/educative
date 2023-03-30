// Given a linked list, reverse the nodes of the linked list k at a time and return the modified list.

// Here, k is a positive integer and is less than or equal to the length of the linked list.
// If the number of nodes is not a multiple of k, the nodes left in the end will remain in their original order.

// You can’t alter the values of the linked list nodes. Only the nodes themselves may be changed.

// Note: Use only O(1) extra memory space.

import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";
import traverseLinkedList from "./linked_list_traversal.js";
import reverseList from "./linked_list_reversal.js";

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

  return { prevNode, currNode };
}

function countTotalLength(head) {
  let count = 0;
  let currNode = head;

  while (currNode) {
    count++;
    currNode = currNode.next;
  }

  return count;
}

export function reverseLinkedList(head, k) {
  if (k === 1 || head === null) {
    return head;
  }

  let count = 0;
  let currNode = head;
  let prevNode = null;
  let lastNodeOfCurrentPart = null;
  let lastNodeOfPreviousPart = null;
  const totalLength = countTotalLength(head);

  while (true) {
    // This begins as the head of the current part to reverse
    // This ends up as the last node after reversal
    lastNodeOfCurrentPart = currNode;
    lastNodeOfPreviousPart = prevNode;

    let reversedList = reverse(lastNodeOfCurrentPart, k);
    ({ prevNode, currNode } = reversedList);
    count += k;

    if (lastNodeOfPreviousPart !== null) {
      lastNodeOfPreviousPart.next = prevNode;
    } else {
      // Sets overall head to end of reversed part of 1st section
      head = prevNode;
    }

    // currNode is now in the next part
    // This links the current part to the next part
    lastNodeOfCurrentPart.next = currNode;

    if (currNode === null || totalLength - count < k) {
      break;
    }
    // This sets up linking current part to previous part
    //    at the begining of the next loop
    prevNode = lastNodeOfCurrentPart;
  }
  return head;
}
