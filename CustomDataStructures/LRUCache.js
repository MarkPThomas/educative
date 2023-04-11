// Implement an LRU cache class with the following functions:

// Init(capacity): Initializes an LRU cache with the capacity size.

// Set(key, value): Adds a new key-value pair or updates an existing key with a new value.

// Get(key): Returns the value of the key, or −1 if the key does not exist.

//  If the number of keys has reached the cache capacity, evict the least recently used key and then add the new key.

// As caches use relatively expensive, faster memory, they are not designed to store very large data sets.

// Whenever the cache becomes full, we need to evict some data from it.

// There are several caching algorithms to implement a cache eviction policy.

// LRU is a very simple and commonly used algorithm.

// The core concept of the LRU algorithm is to evict the oldest data from the cache to accommodate more data.

// Constraints:
// 1 ≤ capacity ≤ 3000
// 0 ≤ key ≤ 10^4
// 0 ≤ value ≤ 10^5
// At most 2×10^5 calls will be made to Set and Get.

import LinkedList from "./linked_list_pair.js";
import LinkedListNode from "./linked_list_pair_node.js";

// Tip: You may use some of the code templates provided
// in the support files

// We will use a linkedlist of a pair of integers
// where the first integer will be the key
// and the second integer will be the value

// S: O(n)
// where n = size of cache
export default class LRUCache {
  // Initializes an LRU cache with the capacity size
  constructor(capacity) {
    this.capacity = capacity;
    this.list = new LinkedList();
    this.values = {};
  }

  // T: O(1)
  // S: O(1)
  // where n = cache length
  // Returns the value of the key, or -1 if the key does not exist.
  get(key) {
    if (key in this.values) {
      const node = this.values[key];
      if (this.list.getHead() !== node) {
        this.list.moveNodeToHead(node);
      }
      return node.pair[1];
    } else {
      return -1;
    }
  }

  // T: O(1)
  // S: O(1)
  // Check if the key exists in the cache hashmap
  set(key, value) {
    if (key in this.values) {
      node = this.values[key];
      node.pair[1] = value;
      this.list.moveNodeToHead(node);
    } else {
      if (this.list.size === this.capacity) {
        const node = this.list.removeTail();
        delete this.values[node.pair[0]];
      }
      const node = this.list.insertAtHead([key, value]);
      this.values[key] = node;
    }
  }
}