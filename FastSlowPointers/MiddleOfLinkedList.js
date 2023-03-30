import LinkedList from "./linked_list.js"
import LinkedListNode from "./linked_list_node.js"

export function getMiddleNode(head) {
  let slow = head;
  let fast = head.next;

  while (fast !== null && fast.next !== null) {
    slow = slow.next;
    fast = fast.next.next;
  }

  return fast === null || slow.next === null ? slow : slow.next;
}