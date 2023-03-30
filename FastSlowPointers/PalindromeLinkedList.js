import LinkedList from "./linked_list.js"
import printListWithForwardArrow from "./print_list.js";
import reverseLinkedList from "./linked_list_reversal.js"

export function palindrome(head) {
  if (head === null) {
    return true;
  }

  let fast = head;
  let slow = head;
  let savedMidNode = null;

  while (fast && fast.next) {
    savedMidNode = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  let savedOddMidnode = null;
  if (fast) {
    // Odd #, remove middle node from consideration, but keep for rebuilding
    savedOddMidnode = slow;
    slow = slow.next;
  }
  savedMidNode.next = null;

  // Reverse 2nd half & compare to first half
  const tail = reverseLinkedList(slow);
  let start = head;
  let end = tail;
  let isPalindrome = true;
  while (start && end) {
    if (start.data !== end.data) {
      isPalindrome = false;
      break;
    }
    start = start.next;
    end = end.next;
  }

  // Restore 2nd half to correct order & splice to first half & any middle node
  const revertData = reverseLinkedList(tail);
  if (savedOddMidnode) {
    savedMidNode.next = savedOddMidnode;
    savedOddMidnode.next = revertData;
  } else {
    savedMidNode.next = revertData;
  }

  return isPalindrome;
}