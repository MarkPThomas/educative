import LinkedList from "./linked_list.js";
import LinkedListNode from "./linked_list_node.js";

export function reverse(head) {
  let prevNode = null;
  let currentNode = head;
  let nextNode = head.next;

  while (currentNode) {
    currentNode.next = prevNode;
    prevNode = currentNode;
    currentNode = nextNode;
    nextNode = nextNode?.next;
  }

  return prevNode;
}
