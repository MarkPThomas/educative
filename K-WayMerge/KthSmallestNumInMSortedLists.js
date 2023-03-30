// Given m number of sorted lists in ascending order and an integer k, find the kth smallest number
// among all the given lists.

// Constraints:
// If k is greater than the total number of elements in the input lists, return the greatest element
// from all the lists.

// If there are no elements in the input lists, return 0.

import { MinHeap } from "./minHeap.js";

export function kSmallestNumber(lists, k) {
  let totalNumbers = 0;
  for (let i = 0; i < lists.length; i++) {
    totalNumbers += lists[i].length;
  }

  if (totalNumbers === 0) {
    return 0;
  } else if (k > totalNumbers) {
    let max = -Infinity;
    lists.forEach((list) => max = Math.max(max, list[list.length - 1]));
    return max;
  }

  const minHeap = new MinHeap();
  for (let i = 0; i < lists.length; i++) {
    minHeap.offer([lists[i][0], { list: lists[i], index: 0 }]);
  }

  let currentK = 0;
  let lastMin;
  while (currentK < k) {
    currentK++;
    lastMin = minHeap.poll();
    const list = lastMin[1].list;
    let index = lastMin[1].index;
    index++;
    if (index < list.length) {
      minHeap.offer([
        list[index],
        { list, index }
      ]);
    }
  }

  return lastMin[0];
}