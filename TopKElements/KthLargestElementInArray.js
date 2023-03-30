// Find the kth largest element in an unsorted array.

// Note: We need to find the kth largest element in the sorted order, not the kth distinct element.

import MinHeap from './min_heap.js'
export function findKthLargest(arr, k) {
  const minHeap = new MinHeap();
  arr.forEach((num) => {
    if (minHeap.size() <= k || num > minHeap.peek()) {
      minHeap.offer(num);
    }
    if (minHeap.size() > k) {
      minHeap.poll();
    }
  });

  return minHeap.poll();
}