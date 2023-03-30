// Given two arrays and an integer , find k pairs of numbers with the smallest sum so that in
// each pair, each array contributes one number to the pair.

// Constraints:
// Input arrays should be sorted in ascending order.

// If the value of k exceeds the total number of valid pairs that may be formed, return all the pairs.

import { MinHeap } from "./minHeap.js";

// Tip: You can use the min heap class
// imported above

export function kSmallestPairs(list1, list2, k) {
  const result = [];
  const minPairs = new MinHeap();

  // Initial mins from list 1 & 1st place of list 2
  for (let i = 0; i < Math.min(k, list1.length); i++) {
    minPairs.offer([list1[i] + list2[0], i, 0]);
  }

  let count = 1;
  while (count <= k && minPairs.size() > 0) {
    const [, i, j] = minPairs.poll();
    result.push([list1[i], list2[j]]);

    const nextIndex = j + 1;
    if (nextIndex < list2.length) {
      minPairs.offer([list1[i] + list2[nextIndex], i, nextIndex]);
    }

    count++;
  }

  return result;
}