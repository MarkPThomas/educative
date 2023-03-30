// You’re given two sorted integer arrays, nums1 and nums2, of size m and n, respectively.

// Your task is to return the median of the two sorted arrays.

// The overall run time complexity should be O(log(m+n))

export function findMedian(nums1, nums2) {
  // Edge case / optimization of no intersection between lists
  if (nums1[nums1.length - 1] <= nums2[0]) {
    return findMedianNoIntersection(nums1, nums2);
  } else if (nums2[nums2.length] <= nums1[0]) {
    return findMedianNoIntersection(nums2, nums1);
  }

  const numsLong = nums1.length >= nums2.length ? nums1 : nums2;
  const numsShort = nums1.length < nums2.length ? nums1 : nums2;

  let leftLong = Math.floor((numsLong.length - 1) / 2);
  let rightLong = leftLong + 1;

  // 0 <= leftShort < numShort.length - 1 (to allow space for rightShort @ end)
  let leftShort = findLessOrEqual(numsLong[leftLong], numsShort);
  leftShort = Math.max(0, Math.min(leftShort, numsShort.length - 1));

  let rightShort = leftShort + 1;

  while (!(numsLong[leftLong] <= numsShort[rightShort]
    && numsShort[leftShort] <= numsLong[rightLong])) {
    if (numsLong[leftLong] > numsShort[rightShort]) {
      if (leftLong === 0) {
        break;
      }
      leftLong = findLessOrEqual(numsShort[rightShort], numsLong, 0, leftLong);
      rightLong = leftLong + 1;
    } else {
      if (leftShort === 0) {
        break;
      }
      leftShort = findLessOrEqual(numsLong[rightLong], numsShort, 0, leftShort);
      rightShort = leftShort + 1;
    }
  }

  // Median value depends on if total length is odd or even, i.e. even for equal list lengths
  return (numsLong.length !== numsShort.length)
    ? Math.min(numsLong[rightLong], numsShort[rightShort])
    : 0.5 * (
      Math.max(numsLong[leftLong], numsShort[leftShort]) +
      Math.min(numsLong[rightLong], numsShort[rightShort])
    );
}

function findMedianNoIntersection(list1, list2) {
  const length = list1.length + list2.length;
  const medianIndexA = Math.floor((length - 1) / 2);
  const medianIndexB = length % 2 > 0 ? medianIndexA : medianIndexA + 1;

  const valueA = projectedMedianValues(medianIndexA, list1, list2);
  const valueB = projectedMedianValues(medianIndexB, list1, list2);

  return 0.5 * (valueA + valueB);
}

function projectedMedianValues(medianIndex, list1, list2) {
  return medianIndex < list1.length
    ? list1[medianIndex]
    : list2[medianIndex - list1.length];
}

function findLessOrEqual(target, nums, left = 0, right = nums.length - 1) {
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (nums[mid] === target) {
      return mid;
    }

    if (nums[mid] < target) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  return left === 0 && target < nums[left] ? -1 : left;
}