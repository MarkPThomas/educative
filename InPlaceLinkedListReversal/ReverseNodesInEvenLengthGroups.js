// You’re given a linked list. Your task is to reverse all of the nodes that are present in the
// groups with an even number of nodes in them.

// The nodes in the linked list are sequentially assigned to non-empty groups whose lengths form
// the sequence of the natural numbers (1,2,3,4...).

// The length of a group is the number of nodes assigned to it. In other words:

// The 1 st node is assigned to the first group.

// The 2 nd and 3 rd nodes are assigned to the second group.

// The 4 th, 5 th, and 6 th nodes are assigned to the third group and so on.

// You have to return the head of the modified linked list.

// Note: The length of the last group may be less than or equal to 1 + the length of the
// second to the last group.

import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";

export function reverseEvenLengthGroups(head) {
  let groupLength = 2;
  let count = 1;
  let currNode = head.next;
  let lastEndNode = head;
  let nextStartNode = null;

  while (currNode) {
    if (count === groupLength) {
      if (count % 2 === 0) {
        nextStartNode = currNode.next;

        let { newHead, newTail } = reverse(lastEndNode.next, count);
        lastEndNode.next = newHead;
        newTail.next = nextStartNode;

        lastEndNode = newTail;
        currNode = newTail;
      } else {
        lastEndNode = currNode;
      }
      count = 0;
      groupLength += 1
    }

    currNode = currNode.next;
    count++;
  }
  count--;

  if (count % 2 === 0) {
    let { newHead } = reverse(lastEndNode.next, count);
    lastEndNode.next = newHead;
  }

  return head;
}

function reverse(head, k) {
  let prevNode = null;
  let currNode = head;
  let count = 0;

  while (count < k && currNode) {
    let nextNode = currNode.next;
    currNode.next = prevNode;
    prevNode = currNode;
    currNode = nextNode;
    count++;
  }

  return { newTail: head, newHead: prevNode };
}