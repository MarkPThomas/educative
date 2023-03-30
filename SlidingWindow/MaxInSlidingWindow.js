import Deque from "./deque.js";

export function findMaxSlidingWindow(nums, w) {
  w = Math.min(w, nums.length);
  const result = [];
  const window = new Deque();

  // Initial window
  for (let i = 0; i < w; i++) {
    // For every element, remove the previous smaller elements from window
    while (!window.isEmpty() && nums[i] > nums[window.peekBack()]) {
      window.pop();
    }

    // Add current element at the back of the queue
    window.push(i);
  }

  // Appending the largest element in the window to the result
  result.push(nums[window.peekFront()]);

  for (let i = w; i < nums.length; i++) {
    // Remove first index if out of window range
    if (!window.isEmpty() && window.peekFront() <= i - w) {
      window.shift();
    }

    // Remove all numbers that are smaller than current number from the tail of list
    while (!window.isEmpty() && nums[i] >= nums[window.peekBack()]) {
      window.pop();
    }

    // Add current element at the back of the queue
    window.push(i);

    // Add max element to result
    result.push(nums[window.peekFront()]);
  }

  return result;
}
