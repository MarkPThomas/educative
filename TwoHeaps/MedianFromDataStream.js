// Implement a data structure that’ll store a dynamically growing list of integers and provide
// access to their median in O(1).

import MinHeap from './min_heap.js'

// Tip: You may use some of the code templates provided
// in the support files
class MedianOfStream {
  constructor() {
    this.minHeapOfLargeNums = new MinHeap();
    this.maxHeapOfSmallNums = new MinHeap();
  }

  // This function should take a number and store it
  insertNum(num) {
    if (this.findMedian() === undefined) {
      this.minHeapOfLargeNums.offer(num);
    } else if (num <= this.findMedian()) {
      this.maxHeapOfSmallNums.offer(-1 * num);
    } else {
      this.minHeapOfLargeNums.offer(num);
    }

    if (this.maxHeapOfSmallNums.size() > this.minHeapOfLargeNums.size()) {
      this.minHeapOfLargeNums.offer(-1 * this.maxHeapOfSmallNums.poll());
    } else if (this.minHeapOfLargeNums.size() > this.maxHeapOfSmallNums.size() + 1) {
      this.maxHeapOfSmallNums.offer(-1 * this.minHeapOfLargeNums.poll());
    }
  }

  // This function should return the median of the stored numbers
  findMedian() {
    if (this.minHeapOfLargeNums.size()) {
      if (this.minHeapOfLargeNums.size() === this.maxHeapOfSmallNums.size()) {
        return 0.5 * (this.minHeapOfLargeNums.peek() + -1 * this.maxHeapOfSmallNums.peek());
      } else {
        return this.minHeapOfLargeNums.peek();
      }
    } else {
      return;
    }
  }
}

export default MedianOfStream;