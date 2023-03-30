// In this problem, you’re given an array of sorted integers in which all of the integers, except one, appears twice.

// Your task is to find the single integer that appears only once.

// The solution should have a time complexity of O(logn) or better and a space complexity of O(1).

export function singleNonDuplicate(nums) {
  // By constraints, no even length arrays can have a single recurring element
  if (nums.length % 2 === 0) {
    return -1;
  }

  let left = 0;
  let right = nums.length - 1;
  while (left < right) {
    let mid = Math.floor((left + right) / 2);
    // For simplicity, keep mid at even values
    if (mid % 2) {
      mid--;
    }
    if (nums[mid] === nums[mid + 1]) {
      // look right in increments of 2
      left = mid + 2;
    } else {
      // look immediately left
      right = mid;
    }
  }

  return nums[left];
}
