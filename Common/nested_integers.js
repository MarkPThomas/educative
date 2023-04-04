class NestedIntegers {
  // Constructor initializes a single integer if a value has been passed
  // else initializes an empty list
  constructor(integer = null) {
    if (integer) this.integer = integer;
    else {
      this.nList = [];
      this.integer = 0;
    }

    // If this NestedIntegers holds a single integer rather
    // than a nested list, returns TRUE, else, returns FALSE
    this.isInteger = function () {
      if (this.integer) return true;
      return false;
    };

    // Returns the single integer, if this NestedIntegers holds a single integer
    // Returns null if this NestedIntegers holds a nested list
    this.getInteger = function () {
      return this.integer;
    };

    // Sets this NestedIntegers to hold a single integer.
    this.setInteger = function (value) {
      this.nList = null;
      this.integer = value;
    };

    // Sets this NestedIntegers to hold a nested list and adds a nested
    // integer to it.
    this.add = function (ni) {
      if (this.integer) {
        this.nList = [];
        this.nList.push(new NestedIntegers(this.integer));
        this.integer = null;
      }
      this.nList.push(ni);
    };

    // Returns the nested list, if this NestedIntegers holds a nested list
    // Returns null if this NestedIntegers holds a single integer
    this.getList = function () {
      return this.nList;
    };
  }
}

export default NestedIntegers;
