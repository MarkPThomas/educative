// Given a non-empty array of positive integers, determine if the array can be divided into two subsets so that the sum of both the
// subsets is equal.

// Constraints:
// 1 ≤ nums.length ≤ 200
// 1 ≤ nums[i] ≤ 100

// T: O(n*m)
// S: O(n*m)
// where n = # items, m = 1/2 sum of items
export function canPartitionArray(nums) {
  if (nums.length < 2) {
    return false;
  }

  const sum = nums.reduce((acc, val) => acc + val, 0);
  if (sum % 2) {
    return false;
  }
  const halfSum = Math.floor(sum / 2);

  const matrix = new Array(halfSum + 1);
  for (let i = 0; i < matrix.length; i++) {
    matrix[i] = new Array(nums.length + 1).fill(0);
  }
  matrix[0].fill(1);

  for (let sums = 1; sums <= halfSum; sums++) {
    for (let numsIndex = 0; numsIndex < nums.length; numsIndex++) {
      if (nums[numsIndex] > sums) {
        matrix[sums][numsIndex + 1] = matrix[sums][numsIndex];
      } else {
        matrix[sums][numsIndex + 1] =
          matrix[sums - nums[numsIndex]][numsIndex] || matrix[sums][numsIndex];
      }
    }
  }

  return Boolean(matrix[halfSum][nums.length]);
}