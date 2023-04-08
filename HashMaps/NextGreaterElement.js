// Let's first define the "next greater element" of some element x in an array of integers as the first element we encounter to the right of x
// (that is, whose index is greater than the index of x) whose value is also greater than x.

// In mathematical terms, y is the next greater element of x, if and only if:
// y > x index of y > index of x the first two conditions don't hold true for any other element z , where index of z < index of y.

// You are given two distinct integer arrays, nums1 and nums2, where nums1 is a subset of nums2.

// For each index i , where 0 ≤ i < nums1.length, find the index j such that nums1[i] = nums2[j] and determine the next greater
// element of nums2[j] in nums2.

// If there is no next greater element, the answer to this query is −1.

// Compose and return an array ans of the same length as that of nums1, such that each value ans[i] is the next greater element of
// nums1[i] in nums2.

// Constraints:

// 1 ≤ nums1.length ≤ nums2.length ≤ 10^3
// 0 ≤ nums1[i], nums2[i] ≤ 10^3

// No integer repeats in nums1
// No integer repeats in nums2
// All of the integers in nums1 also appear in nums2.

// T: O(n_2^2)
// S: O(n_1)
export function nextGreaterElement(nums1, nums2) {
  const ans = Array(nums1.length).fill(-1);

  const hashMap1 = {};
  for (let i = 0; i < nums1.length; i++) {
    hashMap1[nums1[i]] = i;
  }

  for (let i = 0; i < nums2.length; i++) {
    if (hashMap1[nums2[i]] !== undefined) {
      for (let j = i + 1; j < nums2.length; j++) {
        if (nums2[j] > nums2[i]) {
          ans[hashMap1[nums2[i]]] = nums2[j];
          break;
        }
      }
    }
  }

  return ans;
}