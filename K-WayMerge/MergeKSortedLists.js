// Given an array of k sorted linked lists, your task is to merge them into a single sorted list.

import LinkedList from "./linked_list.js"
import LinkedListNode from "./linked_list_node.js"

function merge2Lists(head1, head2) {
  const dummyHead = new LinkedListNode(-1);
  let prevNode = dummyHead;

  while (head1 !== null && head2 !== null) {
    if (head1.data < head2.data) {
      prevNode.next = head1;
      head1 = head1.next;
    } else {
      prevNode.next = head2;
      head2 = head2.next;
    }
    prevNode = prevNode.next;
  }

  if (head1 !== null) {
    prevNode.next = head1;
  } else {
    prevNode.next = head2;
  }

  return dummyHead.next;
}

export function mergeKLists(lists) {
  if (lists.length === 0) {
    return;
  }

  let step = 1;
  while (step < lists.length) {
    // Traversing over the lists in pairs to merge with result
    for (let i = 0; i < lists.length - step; i = i + step * 2) {
      lists[i].head = merge2Lists(
        lists[i].head,
        lists[i + step].head
      );
    }
    step *= 2;
  }

  return lists[0].head;
}