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

// S: O(n)
// where n = # of items cached
class LFUCache {
  constructor(capacity) {
    this.capacity = capacity;
    this.length = 0;
    this.keyValueMap = {}; // int:__,  key:value
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
      this.updateCount(key);
      this.setValue(key, value);
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
      const evictedNode = this.removeLfuFromCountLruMap(minCount); // T: O(n)
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
    this.addToCountLruMap(key, this.keyCountMap[key]);
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
    this.keyValueMap[key] = value;
    this.keyCountMap[key] = count;
    this.addToCountLruMap(key, count);

    this.length++;
  }

  // T: O(1)
  // S: O(1)
  addToCountLruMap(key, count) {
    if (!this.countLruMap[count]) {
      this.countLruMap[count] = new LinkedList();
    }
    this.countLruMap[count].addToHead(new LinkedListNode(key))
  }

  // T: O(n)
  // S: O(1)
  remove(key) {
    delete this.keyValueMap[key];
    delete this.keyCountMap[key];
    const evictedNode = this.removeFromCountLruMap(key); // T: O(n)

    return evictedNode;
  }

  // T: O(n)
  // S: O(1)
  removeLfuFromCountLruMap(count) {
    const evictedNode = this.countLruMap[count].removeTail(); // T: O(n)
    this.removeCountLruMapEntryIfEmpty(count);
    return evictedNode;
  }

  // T: O(n)
  // S: O(1)
  removeFromCountLruMap(nodeKey) {
    const count = this.keyCountMap[nodeKey];
    const evictedNode = this.countLruMap[count].removeNode(nodeKey)  // T: O(n)
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
    return this.keyValueMap[key];
  }

  setValue(key, value) {
    this.keyValueMap[key] = value;
  }
}

class LinkedListNode {
  constructor(key, next = null) {
    this.key = key;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // T: O(1)
  // S: O(1)
  addToHead(node) {
    if (this.head === null) {
      this.head = node;
    } else {
      node.next = this.head;
      this.head = node;
    };
  }

  // T: O(1)
  // S: O(1)
  removeHead() {
    const node = this.head;
    if (node) {
      if (node.next) {
        this.head = node.next;
        node.next = null;
      } else {
        // Only node in list
        this.head = null;
      }
      return node;
    }
  }

  // T: O(n)
  // S: O(1)
  removeTail() {
    let node = this.head;
    if (node) {
      let nextNode = node.next;
      if (nextNode) {
        while (nextNode.next) {
          node = node.next;
          nextNode = nextNode.next;
        }
        node.next = null;
        return nextNode;
      } else {
        // Only node in list
        this.head = null;
        return node;
      }
    }
  }



  // T: O(n)
  // S: O(1)
  getNode(key) {
    let node = this.head;
    while (node && node.key !== key) {
      node = node.next;
    }
    return node;
  }

  // T: O(n)
  // S: O(1)
  removeNode(key) {
    let node = this.head;
    if (node) {
      if (node.key === key) {
        this.head = node.next;
        node.next = null
        return node;
      }

      let nextNode = node.next;
      if (nextNode) {
        while (nextNode.key !== key && nextNode.next) {
          node = node.next;
          nextNode = nextNode.next;
        }
        node.next = nextNode.next;
        nextNode.next = null;
        return nextNode;
      }
    }
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