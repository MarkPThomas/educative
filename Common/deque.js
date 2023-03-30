// Class for a node in a linked list
class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
    this.prev = null;
  }
}

// Doubly linked list
export default class Deque {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  unshift(value) {
    const newNode = new Node(value);

    if (!this.head) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }
  }

  push(value) {
    const newNode = new Node(value);

    if (!this.tail) {
      this.head = newNode;
      this.tail = newNode;
    } else {
      newNode.prev = this.tail;
      this.tail.next = newNode;
      this.tail = newNode;
    }
  }

  shift() {
    if (!this.head) {
      return null;
    }

    const removed = this.head;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.head = removed.next;
      this.head.prev = null;
    }

    return removed.value;
  }

  pop() {
    if (!this.tail) {
      return null;
    }

    const removed = this.tail;

    if (this.head === this.tail) {
      this.head = null;
      this.tail = null;
    } else {
      this.tail = removed.prev;
      this.tail.next = null;
    }

    return removed.value;
  }

  peekFront() {
    return this.head ? this.head.value : null;
  }

  peekBack() {
    return this.tail ? this.tail.value : null;
  }

  isEmpty() {
    return true ? this.head == null : false;
  }

  toList() {
    let result = [],
      temp = this.head;
    while (temp != null) {
      result.push(temp.value);
      temp = temp.next;
    }
    return result;
  }
}