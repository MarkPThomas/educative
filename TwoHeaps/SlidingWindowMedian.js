// Given an integer array nums and an integer k, there is a sliding window of size k which is moving from the very left of the array to the very right.

// You can only see the k numbers in the window.

// Each time the sliding window moves right by one position, return the median of the current window.

// Answers within 10^−5 of the actual value will be accepted.

import MinHeap from './min_heap.js'

export function medianSlidingWindow(nums, k) {
  const minHeapLargeNums = new MinHeap();
  const maxHeapSmallNums = new MinHeap();

  function getMedian() {
    console.log('k: ', k)
    if (k % 2) {
      console.log('Odd')
      return -1 * maxHeapSmallNums.peek();
    } else {
      console.log('Even')
      return 0.5 * (minHeapLargeNums.peek() + -1 * maxHeapSmallNums.peek());
    }
  }

  for (let i = 0; i < k; i++) {
    maxHeapSmallNums.offer(-1 * nums[i]);
  }

  for (let i = 0; i < Math.floor(k / 2); i++) {
    minHeapLargeNums.offer(-1 * maxHeapSmallNums.poll());
  }

  // Visited nums are tracked as they aren't necessarily removed when
  //   they first leave the window, just when they bubble up to root
  const visitedNums = {};
  const medians = [];

  for (let i = k; i < nums.length; i++) {
    medians.push(getMedian());

    const numberExiting = nums[i - k];
    visitedNums[numberExiting] ? visitedNums[numberExiting]++ : visitedNums[numberExiting] = 1;

    // Separate balance is checked since number isn't necessarily removed from heap at time it leaves window
    // Maintains proper weighting between heaps in the meantime
    let balance = (numberExiting <= -1 * maxHeapSmallNums.peek()) ? -1 : 1;

    const numberEntering = nums[i];
    if (maxHeapSmallNums.size() > 0 &&
      numberEntering < -1 * maxHeapSmallNums.peek()) {
      maxHeapSmallNums.offer(-1 * numberEntering);
      balance++;
    } else {
      minHeapLargeNums.offer(numberEntering);
      balance--;
    }

    // Balance heaps
    if (balance < 0) {
      maxHeapSmallNums.offer(-1 * minHeapLargeNums.poll());
    } else if (balance > 0) {
      minHeapLargeNums.offer(-1 * maxHeapSmallNums.poll());
    }

    // Remove any exited numbers
    while (-1 * maxHeapSmallNums.peek() in visitedNums
      && visitedNums[-1 * maxHeapSmallNums.peek()] > 0) {

      visitedNums[-1 * maxHeapSmallNums.peek()]--;
      maxHeapSmallNums.poll();
    }

    while (minHeapLargeNums.size() > 0
      && minHeapLargeNums.peek() in visitedNums
      && visitedNums[minHeapLargeNums.peek()] > 0) {

      visitedNums[minHeapLargeNums.peek()]--;
      minHeapLargeNums.poll();
    }
  }
  medians.push(getMedian());

  return medians;
}