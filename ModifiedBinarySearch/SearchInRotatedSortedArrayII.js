// You are required to find an integer t in an array arr of non-distinct integers.

// Prior to being passed as input to your search function, arr has been processed as follows:

// It has been sorted in non-descending order.

// It has been rotated around some pivot k, such that, after rotation, it looks like this:
// [nums[k], nums[k+1], ..., nums[n-1], nums[0], nums[1], ..., nums[k-1]].

// For example, [10, 30, 40, 42, 42, 47, 78, 90, 901], rotated around pivot k=5 becomes [47, 78, 90, 901, 10, 30, 40, 42, 42].

// Return TRUE if t exists in the rotated, sorted array arr, and FALSE otherwise,
// while minimizing the number of operations in the search.

// Note: In this problem, the value of k is not passed to your search function.

export function search(nums, target) {
  let left = 0;
  let right = nums.length - 1;

  // skip binary search if possible
  if (target === nums[left] || target === nums[right]) {
    return true;
  }

  while (left <= right) {
    const mid = Math.floor((left + right) / 2);

    if (target === nums[mid]) {
      return true;
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

  return false;
}
