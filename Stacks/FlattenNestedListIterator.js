// You’re given a nested list of integers. Each element is either an integer or a list whose elements may also be integers or
// other integer lists.

// Your task is to implement an iterator to flatten the nested list.

// You will have to implement the Nested Iterator class. This class has the following functions:

// Init (nested list): This initializes the iterator with the nested list.
// Next (): This returns the next integer in the nested list.
// Has Next (): This returns TRUE if there are still some integers in the nested list. Otherwise, it returns FALSE.

import NestedIntegers from "./nested_integers.js";

// Assume n is the number of elements, l is the number of nested lists, and d is the maximum nesting depth
// (maximum number of lists inside each other).
// S: O(n + l)

// Constructor: T: O(n + l)
// hasNext(): T: O((n + l) / n) = O(l/n), assuming d << l since increasing d tends to require more l.
// next(): T: same as hasNext() => O(l/n)

export var NestedIterator = function (nestedList) {
  // reverse so that head is returned by 'pop'
  this.stack = [...nestedList.reverse()];
};

// has_next checks if there is an element in a nested_list
NestedIterator.prototype.hasNext = function () {
  while (this.stack.length) {
    const top = this.stack[this.stack.length - 1];
    if (top.isInteger()) {
      return true;
    }

    // Add items of sublist in reverse order to keep head at end
    const subList = this.stack.pop().getList();
    for (let i = subList.length - 1; i >= 0; i--) {
      this.stack.push(subList[i]);
    }
  }

  return false;
};

// next will return the integer from the nestedList
NestedIterator.prototype.next = function () {
  if (this.hasNext()) {
    return this.stack.pop().getInteger();
  } else {
    return null;
  }
};

// ------ Please don't change the following function ----------
// flatten_list function is used for testing porpuses.
// Your code will be tested using this function
export function flattenList(nestedIteratorObject) {
  let result = [];
  while (nestedIteratorObject.hasNext()) {
    result.push(nestedIteratorObject.next());
  }
  return result;
}
