// Design a custom stack, Min Stack. Implement the Min Number(), Push() and Pop() methods:

// Pop(): Removes and returns from the stack the value that was most recently pushed on to it.

// Push(): Pushes the provided value on to the stack.

// Min Number(): Returns the minimum value in the stack in O(1) time.

// Constraints:

// -2^31 ≤ value ≤ 2^31

// The Pop() and Min Number() methods will always be called on non-empty stacks.

// At most, 3×10^3 calls will be made to Push(), Pop(), and Min Number().

// S: O(n)
// where n = # elements stored
export default class MinStack {
  constructor() {
    this.minStack = [];
    this.valuesStack = [];
  }

  // T: O(1)
  // S: O(1)
  pop() {
    this.minStack.pop();
    return this.valuesStack.pop();
  }

  // T: O(1)
  // S: O(1)
  push(value) {
    this.valuesStack.push(value);
    const updatedMin = Math.min(value, this.minNumber());
    this.minStack.push(updatedMin);
  }

  // T: O(1)
  // S: O(1)
  minNumber() {
    return this.minStack.length ? this.minStack[this.minStack.length - 1] : Infinity;
  }
}
