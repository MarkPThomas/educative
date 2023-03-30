// Given an array of positive integers nums and a positive integer target, find the window size
// of the shortest contiguous subarray whose sum is greater than or equal to the target value.

// If no subarray is found, 0 is returned.

export function minSubArraylen(target, nums) {
  let minSize = Infinity;
  let left = 0;
  let currentSum = 0;
  for (let right = 0; right < nums.length; right++) {
    if (nums[right] >= target) {
      return 1;
    }

    currentSum += nums[right];

    while (currentSum >= target) {
      if (currentSum >= target) {
        minSize = Math.min(minSize, right - left + 1);
      }
      currentSum -= nums[left];
      left++;
    }
  }

  return minSize === Infinity ? 0 : minSize;
}
