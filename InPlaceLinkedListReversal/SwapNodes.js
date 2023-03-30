// Given the linked list and an integer k, return the head of the linked list after swapping
// the values of the k th node from the beginning and the k th node from the end of the linked list.

import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";
import swap from "./swap_two_nodes.js";

export function swapNodes(head, k) {
  let count = 0;
  let kthNodeA = head;
  let kthNodeB = head;
  let countNode = head;

  while (countNode) {
    count++;
    countNode = countNode.next;
    if (count < k) {
      kthNodeA = kthNodeA.next;
    } else if (count > k) {
      kthNodeB = kthNodeB.next;
    }
  }

  swap(kthNodeA, kthNodeB);

  return head;
}

// Satisfies problem, but requires 2 passes rather than 1
export function swapNodes2Pass(head, k) {
  // Get kth node
  let count = 1;
  let kthNodeA = head;
  while (count < k) {
    kthNodeA = kthNodeA.next;
    count++;
  }

  // Determined mirrored kth node position
  let countNode = kthNodeA;
  while (countNode.next) {
    countNode = countNode.next;
    count++;
  }
  let kMirrored = count - k + 1;

  // Get mirrored kth node
  count = 1;
  let kthNodeB = head;
  while (count < kMirrored) {
    kthNodeB = kthNodeB.next;
    count++;
  }

  // Swap kth nodes
  swap(kthNodeA, kthNodeB);

  return head;
}
