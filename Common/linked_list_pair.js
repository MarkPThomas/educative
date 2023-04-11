import LinkedListNode from "./linked_list_pair_node.js";

// Template for the linked list
class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
    this.size = 0;
  }

  moveToHead(pair) {
    const node = this.getNode(pair);
    this.moveNodeToHead(node);
  }

  moveNodeToHead(node) {
    if (node == null) {
      return;
    }
    if (!node.prev == null) {
      node.prev.next = node.next;
    } else if (!node.next == null) {
      node.next.prev = node.prev;
    } else if (node == this.head) {
      this.head = this.head.next;
    } else if (node == this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    // Insertion at head
    if (!this.head) {
      this.tail = node;
      this.head = node;
    } else {
      node.next = this.head;
      this.head.prev = node;
      this.head = node;
    }
  }

  insertAtHead(pair) {
    let newNode = new LinkedListNode(pair);
    if (!this.head) {
      this.tail = newNode;
      this.head = newNode;
    } else {
      newNode.next = this.head;
      this.head.prev = newNode;
      this.head = newNode;
    }

    this.size++;

    return newNode;
  }

  insertAtTail(pair) {
    let new_node = new LinkedListNode(pair);
    if (this.tail == null) {
      this.tail = new_node;
      this.head = new_node;
      new_node.next = null;
    } else {
      this.tail.next = new_node;
      new_node.prev = this.tail;
      this.tail = new_node;
      new_node.next = None;
    }

    this.size += 1;
  }

  remove(pair) {
    let i = this.getHead();
    while (i != null) {
      if (i.pair && i.pair[0] == pair[0]) {
        return this.removeNode(i);
      }
      i = i.next;
    }
  }

  removeNode(node) {
    if (node == null) {
      return;
    }
    if (!node.prev == null) {
      node.prev.next = node.next;
    } else if (!node.next == null) {
      node.next.prev = node.prev;
    } else if (node == this.head) {
      this.head = this.head.next;
    } else if (node == this.tail) {
      this.tail = this.tail.prev;
      this.tail.next = null;
    }

    this.size = this.size - 1;

    return node;
  }

  removeHead() {
    return this.removeNode(this.head);
  }

  removeTail() {
    return this.removeNode(this.tail);
  }
  getTail() {
    return this.tail;
  }
  getHead() {
    return this.head;
  }

  getNode(pair) {
    let i = this.getHead();
    while (i != null) {
      if (i.pair && i.pair[0] == pair[0]) {
        return i;
      }
      i = i.next;
    }
  }
}

export default LinkedList;
