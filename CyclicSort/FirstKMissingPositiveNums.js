// For a given unsorted array, find the first k missing positive numbers in that array.

// Constraints:
// Ignore all negative numbers.

// If missing_nums.length ≠ k, add missing numbers up to k.

// 1 ≤ k ≤ 10^4
// 1 ≤ missing_nums.length ≤ 200

export function firstKMissingNumbers(arr, k) {
  cyclicSort(arr);

  const missingNumbers = [];
  const skipNumbers = {};
  let count = 0;
  for (let i = 0; i < arr.length; i++) {
    // Don't get more missing numbers than required
    if (count === k) {
      break;
    }
    const targetIndex = mappedIndex(arr, i);
    if (i !== targetIndex) {
      missingNumbers.push(i + 1);
      count++;
      if (arr[i] > 0) {
        // Add positive values that may need to be skipped
        skipNumbers[arr[i]] = 1;
      }
    }
  }

  let nextValue = arr.length + 1;
  while (count < k) {
    while (skipNumbers[nextValue]) {
      nextValue++;
    }
    missingNumbers.push(nextValue);
    nextValue++;
    count++;
  }

  return missingNumbers;
}

function cyclicSort(nums) {
  for (let i = 0; i < nums.length; i++) {
    let targetIndex = mappedIndex(nums, i);
    while (isInRange(nums, targetIndex) && nums[i] !== nums[targetIndex]) {
      swap(nums, i, targetIndex);
      targetIndex = mappedIndex(nums, i);
    }
  }
}

function mappedIndex(nums, i) {
  return nums[i] - 1;
}

function isInRange(nums, i) {
  return 0 <= i && i < nums.length;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}