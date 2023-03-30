// Given an unsorted integer array, nums, return the smallest missing positive integer.
// Create an algorithm that runs with an O(n) time complexity and utilizes a constant amount of space.

export function smallestMissingPositiveInteger(nums) {
  cyclicSort(nums);

  let i = 0;
  while (i < nums.length) {
    if (i !== correctSpot(nums, i)) {
      console.log(nums);
      return i + 1;
    }
    i++
  }
  return i === nums.length ? i + 1 : -1;
}

function cyclicSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let targetSpot = correctSpot(nums, i);
    while (1 <= targetSpot <= nums.length
      && nums[i] !== nums[targetSpot]) {

      swap(nums, i, targetSpot);
      targetSpot = correctSpot(nums, i);
    }
  }
}

function correctSpot(nums, i) {
  // i - 1 so that 1 occurs at index 0
  return nums[i] - 1;
}

function swap(nums, i, j) {
  if (0 <= j < nums.length) {
    const temp = nums[i];
    nums[i] = nums[j];
    nums[j] = temp;
  }
}