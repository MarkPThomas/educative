// Given an array, nums, containing n distinct numbers in the range [0,n],
// return the only number in the range that is missing from the array.

import Traversal from './traversal.js'

export function findMissingNumber(nums) {
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] !== i) {
      // Missing # has another number in it's place that is out of range
      // Don't attempt to place # in correct position
      if (nums[i] < 0 || nums.length - 1 < nums[i]) {
        break;
      } else {
        swap(nums, i, nums[i]);
      }
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i) {
      return i;
    }
  }

  return -1
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}