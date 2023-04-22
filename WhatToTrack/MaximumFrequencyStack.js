// Design a stack - like data structure.You should be able to push elements to this data structure and pop elements with maximum frequency.

// You’ll need to implement the FreqStack class that should consist of the following:

// FreqStack: This is a class used to declare a frequency stack.

// Push(data): This is used to push an integer data onto the top of the stack.

// Pop(): This is used to remove and return the most frequent element in the stack.

// Note: If there is a tie for the most frequent element, then the most recently pushed element is removed and returned.

// Constraints:
// 0 ≤ value ≤ 10^9
// At most, 2×10^3 calls will be made to Push() and Pop().
// It is guaranteed that there will be at least one element in the stack before calling Pop().


// S: O(n)
// where n = total # elements stored in stack
export var FreqStack = function () {
  this.valuesFrequency = {};
  this.frequencyValues = {};
  this.maxFrequency = 0;
}

// T: O(1)
FreqStack.prototype.push = function (value) {
  if (!this.valuesFrequency[value]) {
    this.valuesFrequency[value] = 1;
  } else {
    this.valuesFrequency[value]++;
  }

  const newCount = this.valuesFrequency[value];
  this.maxFrequency = Math.max(this.maxFrequency, newCount);
  if (!this.frequencyValues[newCount]) {
    this.frequencyValues[newCount] = [value];
  } else {
    this.frequencyValues[newCount].push(value);
  }
}

// T: O(1)
FreqStack.prototype.pop = function () {
  if (this.maxFrequency === 0) {
    return;
  }

  let returnValue = this.frequencyValues[this.maxFrequency].pop();
  this.valuesFrequency[returnValue]--;
  if (this.frequencyValues[this.maxFrequency].length === 0) {
    this.maxFrequency--;
  }

  return returnValue;
};