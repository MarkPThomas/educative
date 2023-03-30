// Given a sorted integer array nums and two integers—k and num—return the k closest integers to num in this array.

// Ensure that the result is sorted in ascending order.

// The integer a is closer to num than an integer b if the following are true:

// |a - num| < |b - num|, or

// |a - num| == |b - num| and a < b

import binarySearch from "./binary_search.js";
// You may use the code template provided in the binary_search.js file.

export function findClosestElements(nums, k, num) {
  if (k >= nums.length) {
    return nums;
  }

  let rightPtr;
  // Consider out of range cases first
  if (num <= nums[0]) {
    rightPtr = 0;
  } else if (nums[nums.length - 1] <= num) {
    rightPtr = nums.length;
  } else {
    // Next work out from nearest match
    rightPtr = indexGreaterOrEqual(num, nums);
  }
  let leftPtr = rightPtr - 1;

  while (rightPtr - leftPtr - 1 < k) {
    if (leftPtr < 0) {
      // Only add/increment right pointer
      rightPtr++;
    } else if (rightPtr >= nums.length) {
      // Only add/increment left pointer
      leftPtr--;
    } else {
      // Take value of closest distance or lesser value of equal distances
      const leftDistance = Math.abs(num - nums[leftPtr]);
      const rightDistance = Math.abs(num - nums[rightPtr]);
      if (leftDistance < rightDistance
        || (leftDistance === rightDistance
          && nums[leftPtr] < nums[rightPtr])) {
        leftPtr--;
      } else {
        rightPtr++;
      }
    }
  }

  // Add values in window
  return nums.slice(leftPtr + 1, rightPtr);
}

function indexGreaterOrEqual(target, range) {
  let start = 0;
  let end = range.length - 1;
  while (start <= end) {
    const mid = Math.floor((start + end) / 2);

    if (target === range[mid]) {
      return mid;
    }

    if (target < range[mid]) {
      end = mid - 1;
    } else {
      start = mid + 1;
    }
  }
  return end;
}