import Bucket from "./designHashMap_bucket.js";

// Put: T: O(1) -> O(n) if many collisions
// Get: T: O(1) -> O(n) if many collisions
// Remove: T: O(1) -> O(n) if many collisions
// S: O(m + n)
// where n = # items, m = size of hashmap, e.g. keyspace
class MyHashMap {
  // Initialize hashmap here
  constructor(keySpace) {
    this.keySpace = keySpace;
    this.buckets = Array(this.keySpace).fill(new Bucket());
  }

  put(key, value) {
    if (key === null || value === null) {
      return null;
    }
    this.buckets[key % this.keySpace].update(key, value);
  };

  get(key) {
    if (key === null) {
      return -1;
    }
    let value = this.buckets[key % this.keySpace].get(key);
    return value;
  };

  remove(key) {
    this.buckets[key % this.keySpace].remove(key);
  };
}

export default MyHashMap;