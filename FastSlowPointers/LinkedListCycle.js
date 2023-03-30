import LinkedList from "./linked_list.js"
import LinkedListNode from "./linked_list_node.js"

export function detectCycle(head) {
  let fast = head;
  let slow = head;

  while (fast !== null && fast.next !== null) {
    fast = fast.next.next;
    slow = slow.next;
    if (fast.data === slow.data) {
      return true;
    }
  }

  return false;
}