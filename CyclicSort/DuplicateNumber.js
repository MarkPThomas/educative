// Given an array of integers, find a duplicate number such that the array contains n+1 integers in the range [1,n] inclusive.

// There is only one repeated number in an array.

// You need to find that repeated number.

// Note: You cannot modify a given array and have to solve the problem only using constant extra space.

export function findDuplicate(nums) {
  let slow = nums[0];
  let fast = nums[0];

  do {
    slow = nums[slow];
    fast = nums[nums[fast]];
  } while (slow !== fast);

  slow = nums[0];
  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return fast;
}