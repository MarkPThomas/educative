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
    // LFU items, although ties are not handled
    const evictKey = this.getEvictKey(); // T: O(n)
    if (evictKey !== undefined) {
      return this.remove(evictKey);
    }
  }

  // T: O(1)
  // S: O(1)
  updateCount(key) {
    this.keyCountMap[key]++;
  }

  // T: O(n)
  // S: O(1)
  // where n = # of items cached
  getEvictKey() {
    let min = Infinity;
    let minCountKey;
    for (const key in this.keyCountMap) {
      if (this.keyCountMap[key] < min) {
        min = this.keyCountMap[key];
        minCountKey = key;
      }
    }
    return minCountKey;
  }

  // T: O(1)
  // S: O(1)
  add(key, value, count = 1) {
    this.keyValueMap[key] = value;
    this.keyCountMap[key] = count;
    this.length++;
  }

  // T: O(1)
  // S: O(1)
  remove(key) {
    const value = this.keyValueMap[key];
    delete this.keyValueMap[key];
    delete this.keyCountMap[key];
    this.length--;
    return [key, value];
  }

  getValue(key) {
    return this.keyValueMap[key];
  }

  setValue(key, value) {
    this.keyValueMap[key] = value;
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
  cache.put(54, 54); // Cache overfull, remove LFU, tie in LFU w/ 52, 53 @ 1, w/ LRU = 52
  result = cache.get(53);
  console.log(result)
  console.log(`${53} expected`);
  cache.put(55, 55); // Cache overfull, remove LFU = 54, which removes all of the lowest count items
  result = cache.get(51);
  console.log(result)
  console.log(`${-1} expected`);
}

test1();
test2();