// Given a sorted integer array, nums, and an integer value, target, the array is rotated by some
// arbitrary number.

// Search and return the index of target in this array. If the target does not exist, return -1.

// Constraints
// All values in nums are unique.
// The values in nums are in sorted in ascending order.
// The array may have been rotated by some arbitrary number

export function binarySearchRotated(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  // skip binary search if possible
  if (target === nums[left]) {
    return left;
  }
  if (target === nums[right]) {
    return right;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (target === nums[mid]) {
      return mid;
    }

    // 1/2 of set is always sorted if mid != target
    if (nums[left] <= nums[mid]) {
      // left half sorted, right half may be sorted
      if (nums[left] <= target && target < nums[mid]) {
        // lies in sorted left half
        right = mid - 1;
      } else {
        // lies in right half (sorted or unsorted)
        left = mid + 1;
      }
    }
    else {
      // left half unsorted => right half sorted
      if (nums[mid] < target && target <= nums[right]) {
        // lies in sorted right half
        left = mid + 1;
      } else {
        // lies in unsorted left half
        right = mid - 1;
      }
    }
  }

  return -1;
}