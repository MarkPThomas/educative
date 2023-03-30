// Given an array of integers arr and an integer k, return the k most frequent elements.

// Note: You can return the answer in any order.

import MinHeap from './min_heap.js'

export function topKFrequent(arr, k) {
  const numFreqs = {};
  arr.forEach((num) => {
    numFreqs[num] = numFreqs[num] ? numFreqs[num] + 1 : 1;
  });

  const minHeap = new MinHeap();
  for (let num in numFreqs) {
    if (minHeap.size() >= k) {
      minHeap.poll();
    }
    minHeap.offer([numFreqs[num], num]);
  }

  const result = [];
  while (minHeap.size() > 0) {
    result.push(minHeap.poll()[1]);
  }

  return result;
}