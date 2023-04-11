// Template for linked list node class
class LinkedListNode {
  constructor(pair) {
    this.first = pair[0];
    this.second = pair[1];
    this.pair = pair;
    this.next = null;
    this.prev = null;
  }
}

export default LinkedListNode;
