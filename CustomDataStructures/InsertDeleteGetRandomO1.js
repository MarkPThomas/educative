// Implement a data structure that can perform the following operations:

// Insert(): This function takes an integer as its parameter and, if it does not already exist in the set, adds it to the set, returning TRUE.

// If the integer already exists in the set, the function returns FALSE.

// Delete(): This function takes an integer as its parameter and, if it exists in the set, removes it, returning TRUE.

// If the integer does not exist in the set, the function returns FALSE.

// GetRandom(): This function takes no parameters. It returns an integer chosen at random from the set.

// Note: Your implementation should aim to have a running time of O(1) (on average) for each operation.

// Constraints:
// −2^31 ≤ data ≤ 2^31, where data represents any integer we store in our data structure.

// No more than 2×10^5 calls will be made to the Insert(), Delete() and GetRandom() functions.

// There will be at least one element in the data structure when the GetRandom() function is called.

// S: O(n)
// where n = # items stored
export class RandomSet {
  constructor() {
    this.itemsMap = {};
    this.items = [];
  }

  // T: O(1)
  // S: O(1)
  insert(val) {
    if (val in this.itemsMap) {
      return false;
    }
    this.itemsMap[val] = this.items.push(val) - 1;
    return true;
  }

  // T: O(1)
  // S: O(1)
  delete(val) {
    if (val in this.itemsMap) {
      const indexToRemove = this.itemsMap[val];
      const valueToUpdate = this.items[this.items.length - 1];

      this.itemsMap[valueToUpdate] = indexToRemove;
      this.items[indexToRemove] = this.items[this.items.length - 1];

      this.items.pop();
      delete this.itemsMap[val];

      return true;
    }

    return false;
  }

  // T: O(1)
  // S: O(1)
  getRandom() {
    return this.items[Math.round(Math.random() * (this.items.length - 1))];
  }
}
