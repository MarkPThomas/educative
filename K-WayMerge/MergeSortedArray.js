// Given two sorted integer arrays, nums1 and nums2, and the number of data elements in each array,
// m and n, implement a function that merges the second array into the first one.

// You have to modify nums1 in place.

// Note: Assume that nums1 has a size equal to m+n, meaning it has enough space to hold additional
// elements from nums2

import { Traversal } from "./traversal.js";

// Tip: You may use some of the code templates provided
// in the support file

export function mergeSorted(nums1, m, nums2, n) {
  let p2 = n - 1;
  let p1 = m - 1;
  let ptr = nums1.length - 1;

  while (ptr >= 0) {
    if ((p2 >= 0 && p1 >= 0 && nums2[p2] >= nums1[p1])
      || p1 < 0) {
      nums1[ptr] = nums2[p2];
      p2--;
    } else {
      nums1[ptr] = nums1[p1];
      p1--;
    }
    ptr--;
  }

  return nums1;
}