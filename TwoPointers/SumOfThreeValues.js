export function findSumOfThree(nums, target) {
  nums.sort((a, b) => a - b);

  for (let i = 0; i < nums.length - 2; i++) {
    let low = i + 1;
    let high = nums.length - 1;

    for (let j = i + 1; j < nums.length - 1; j++) {
      if (low >= high) {
        break;
      }

      const sumOf3 = nums[i] + nums[low] + nums[high];
      if (sumOf3 === target) {
        return true;
      } else if (sumOf3 > target) {
        high--;
      } else {
        low++;
      }
    }
  }

  return false;
}
