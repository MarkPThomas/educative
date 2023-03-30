// Template for printing the linked list with forward arrows
function printListWithForwardArrow(linkedListNode) {
  let temp = linkedListNode;
  let result = "";
  while (temp != null) {
    result += temp.data;
    temp = temp.next;
    if (temp != null) result += " → ";
    // if this is the last node, print null at the end
    else result += " → null";
  }
  return result;
}

export default printListWithForwardArrow;
