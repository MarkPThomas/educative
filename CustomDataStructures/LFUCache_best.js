// Design and implement a data structure for a Least Frequently Used (LFU) cache.

// Implement the LFUCache class. Here is how it should be implemented:

// LFUCache(capacity): This function initializes the object with the capacity of the data structure.

// get(key): This function gets the value of the key if it exists in the cache. Otherwise, it returns -1.

// put(key, value): This function updates the value of the key if present, or inserts the key if it’s not present.

// When the cache reaches its capacity, it should invalidate and remove the least frequently used key before inserting a new item.

// For this problem, when there’s a tie, that is, two or more keys have the same frequency, the least recently used key is invalidated.

// To determine the least frequently used key, a use counter is maintained for each key in the cache.

// The key with the smallest use counter is the least frequently used key.

// When a key is first inserted into the cache, its use counter is set to 1 (due to the Put() operation).

// The use counter for a key in the cache is incremented and either a Get() or Put() operation is called on it.

// The get() and put() functions should both run with an average time complexity of O(1).

// Constraints:
// 0 ≤ capacity ≤ 10^4
// 0 ≤ key ≤ 10^5
// 0 ≤ value ≤ 10^9
// At most 2×10^5 calls will be made to Get() and Put().

// T: O()
// S: O()
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.length = 0;
    this.keyValueMap = {}; // int:Node,  key:node
    this.keyCountMap = {}; // int:int, key:count
    this.countLruMap = {}; // int:LL,  count:LLhead
  }

  // T: O(1)
  // S: O(1)
  get(key) {
    if (key in this.keyValueMap) {
      this.updateCount(key);
      return this.getValue(key);
    }
    return -1;
  }

  // T: O(1) -> O(n) if at capacity
  // S: O(1)
  put(key, value) {
    if (key in this.keyCountMap) {
      const updatedNode = this.updateCount(key);
      this.setValue(updatedNode);
    } else {
      if (this.length > 0 && this.length === this.capacity) {
        this.removeLFU(); // T: O(n)
      }
      this.add(key, value);
    }
  }

  // T: O(n)
  // S: O(1)
  // where n = # of items cached
  removeLFU() {
    // LFU items, ties are handled through LRU
    const minCount = this.getMinCount(); // T: O(n)
    if (minCount !== Infinity) {
      const evictedNode = this.removeLfuFromCountLruMap(minCount);
      delete this.keyValueMap[evictedNode.key];
      delete this.keyCountMap[evictedNode.key];

      this.length--;
      return evictedNode;
    }
  }

  // T: O(1)
  // S: O(1)
  updateCount(key) {
    const updatedNode = this.removeFromCountLruMap(key);
    this.keyCountMap[key]++;
    this.addToCountLruMap(updatedNode, this.keyCountMap[key]);
    return updatedNode;
  }

  // T: O(n)
  // S: O(1)
  // where n = # of items cached
  getMinCount() {
    let min = Infinity;
    for (const key in this.keyCountMap) {
      if (this.keyCountMap[key] < min) {
        min = this.keyCountMap[key];
      }
    }
    return min;
  }

  // T: O(1)
  // S: O(1)
  add(key, value, count = 1) {
    this.keyCountMap[key] = count;
    const node = this.addToCountLruMap({ key, value }, count);
    this.keyValueMap[key] = node;

    this.length++;
  }

  // T: O(1)
  // S: O(1)
  addToCountLruMap(data, count) {
    if (!this.countLruMap[count]) {
      this.countLruMap[count] = new LinkedList();
    }
    return this.countLruMap[count].addToHead(data);
  }

  // T: O(1)
  // S: O(1)
  remove(key) {
    delete this.keyValueMap[key];
    delete this.keyCountMap[key];
    const evictedNode = this.removeFromCountLruMap(key); // T: O(1)

    return evictedNode;
  }

  // T: O(1)
  // S: O(1)
  removeLfuFromCountLruMap(count) {
    const evictedNode = this.countLruMap[count].removeTail(); // T: O(1)
    this.removeCountLruMapEntryIfEmpty(count);
    return evictedNode;
  }

  // T: O(1)
  // S: O(1)
  removeFromCountLruMap(nodeKey) {
    const count = this.keyCountMap[nodeKey];
    const evictedNode = this.countLruMap[count].removeNode(nodeKey)  // T: O(1)
    this.removeCountLruMapEntryIfEmpty(count);
    return evictedNode;
  }

  removeCountLruMapEntryIfEmpty(count) {
    if (!this.countLruMap[count].head) {
      // No items are left at count. Remove entry
      delete this.countLruMap[count];
    }
  }

  getValue(key) {
    return this.keyValueMap[key].value;
  }

  setValue(node) {
    this.keyValueMap[node.key] = node;
  }
}

class LinkedListNode {
  constructor(data, next = null, prev = null) {
    this.key = data.key;
    this.value = data.value;
    this.next = next;
    this.prev = prev;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
    this.tail = null;
  }

  // T: O(1)
  // S: O(1)
  addToHead(data) {
    const node = new LinkedListNode(data);
    if (this.head === null) {
      this.head = node;
      this.tail = node;
    } else {
      node.next = this.head;
      node.next.prev = node;
      this.head = node;
    };
    return node;
  }

  // T: O(1)
  // S: O(1)
  removeHead() {
    const node = this.head;
    if (node) {
      if (node.next) {
        this.head = node.next;
        this.head.prev = null;
        node.next = null;
      } else {
        // Only node in list
        this.head = null;
        this.tail = null;
      }
      return node;
    }
  }

  // T: O(1)
  // S: O(1)
  removeTail() {
    const node = this.tail;
    if (node) {
      if (node.prev) {
        this.tail = node.prev;
        this.tail.next = null;
        node.prev = null;
      } else {
        // Only node in list
        this.head = null;
        this.tail = null;
      }
      return node;
    }
  }

  // T: O(1)
  // S: O(1)
  removeNode(node) {
    if (this.head.key === node.key) {
      return this.removeHead();
    }
    if (this.tail.key === node.key) {
      return this.removeTail();
    }

    node.prev.next = node.next;
    node.next = node.prev;

    node.next = null;
    node.prev = null;
    return node;
  }
}

// Basic get/put
const test1 = () => {
  const cache = new LFUCache(2);
  let result;
  result = cache.get(10);
  console.log(result)
  console.log(`${-1} expected`);
  cache.put(10, 10);
  result = cache.get(10);
  console.log(result)
  console.log(`${10} expected`);
}

// Full cache get/put
const test2 = () => {
  const cache = new LFUCache(3);
  let result;
  cache.put(50, 50);
  cache.put(51, 51);
  result = cache.get(51);
  console.log(result)
  console.log(`${51} expected`);
  cache.put(52, 52);

  cache.put(53, 53); // Cache overfull, remove LFU, tie in LFU w/ 50, 52 @ 1, w/ LRU = 50
  result = cache.get(50);
  console.log(result)
  console.log(`${-1} expected`);

  cache.put(54, 54); // Cache overfull, remove LFU, tie in LFU w/ 52, 53 @ 1, w/ LRU = 52
  result = cache.get(52);
  console.log(result)
  console.log(`${-1} expected`);

  result = cache.get(53);
  console.log(result)
  console.log(`${53} expected`);

  cache.put(55, 55); // Cache overfull, remove LFU = 54, which removes all of the lowest count items
  result = cache.get(54);
  console.log(result)
  console.log(`${-1} expected`);

  result = cache.get(51);
  console.log(result)
  console.log(`${51} expected`);
}

test1();
test2();