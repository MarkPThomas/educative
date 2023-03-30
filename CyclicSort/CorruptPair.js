// Given a non-empty unsorted array taken from a range of 1 to n.

// Due to some data error, one of the numbers is duplicated, which results in another number missing.

// Create a function that returns the corrupt pair (missing, duplicated).

export function findCorruptPair(nums) {
  for (let i = 0; i < nums.length; i++) {
    let targetIndex = mappedIndex(nums, i);
    while (isInRange(nums, targetIndex) && nums[i] !== nums[targetIndex]) {
      swap(nums, i, targetIndex);
      targetIndex = mappedIndex(nums, i);
    }
  }

  for (let i = 0; i < nums.length; i++) {
    if (i !== mappedIndex(nums, i)) {
      const duplicated = nums[i];
      const missing = i + 1;
      return [missing, duplicated];
    }
  }

  return [];
}

function mappedIndex(nums, i) {
  return nums[i] - 1;
}

function isInRange(nums, i) {
  return 0 <= i < nums.length;
}

function swap(nums, i, j) {
  const temp = nums[i];
  nums[i] = nums[j];
  nums[j] = temp;
}