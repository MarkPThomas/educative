// Given an infinite stream of integers, nums, design a class to find the kth largest element in a stream.

// Note: It is the kth largest element in the sorted order, not the kth distinct element.

// The class should have the following functions, inputs, and return values:

// Init(): It takes an array of integers and an integer k and initializes the class object.

// Add(value): It takes one integer value, appends it to the stream, and calls the Return kth largest() function.

// Return kth largest(): It returns an integer value that represents the kth largest element in the stream.

import MinHeap from './min_heap.js'
// Tip: You may use some of the code templates provided
// in the support files

class KthLargest {
  // constructor to initialize heap and add values in it
  constructor(k, nums) {
    this.k = k;
    this.minHeap = new MinHeap(nums);
    while (this.minHeap.size() > this.k) {
      this.minHeap.poll();
    }
  }

  // adds element in the heap
  add(val) {
    this.minHeap.offer(val)
    if (this.minHeap.size() > this.k) {
      this.minHeap.poll();
    }
    return this.returnKthLargest();
  }

  // returns kth largest element from heap
  returnKthLargest() {
    return this.minHeap.peek();
  }
}

export default KthLargest