import { Interval } from "./interval.js"

// Given a list of meeting time intervals as input,
// find the minimum number of meeting rooms needed to hold these meetings.

export function findSets(intervals) {
  if (intervals.length === 0) {
    return 0;
  }
  intervals.sort((a, b) => a.start - b.start);
  const minHeap = [];

  intervals.forEach((interval) => {
    if (minHeap.length && minHeap[0] <= interval.start) {
      removeRoot(minHeap);
    }
    insert(minHeap, interval.end);
  })
  return minHeap.length;
}

function insert(heap, value) {
  // 1. Add to tail
  const targetIndex = heap.push(value) - 1;

  // 2. Heapify up
  heapifyUp(heap, targetIndex);
}

function removeRoot(heap) {
  // 1. Swap root with tail & remove tail
  heap[0] = heap[heap.length - 1];
  heap.pop();

  // 3. Heapify down
  heapifyDown(heap, 0);
}

function heapifyUp(heap, targetIndex) {
  const parentIndex = Math.floor((targetIndex - 1) / 2);

  // Root base case
  if (parentIndex < 0 || !shouldSwap(heap, targetIndex, parentIndex)) {
    return;
  }

  swap(heap, targetIndex, parentIndex);
  heapifyUp(heap, parentIndex);
}

function heapifyDown(heap, targetIndex) {
  let swapIndex = targetIndex;
  swapIndex = considerChildSwap(heap, swapIndex, 1, targetIndex);
  swapIndex = considerChildSwap(heap, swapIndex, 2, targetIndex);

  // No swap base case
  if (swapIndex === targetIndex) {
    return;
  }

  swap(heap, targetIndex, swapIndex);
  heapifyDown(heap, swapIndex);
}

function considerChildSwap(heap, swapIndex, childNumber, targetIndex) {
  const childIndex = 2 * targetIndex + childNumber;

  if (childIndex < heap.length
    && shouldSwap(heap, childIndex, swapIndex)) {
    return childIndex;
  } else {
    return swapIndex;
  }
}

function shouldSwap(minHeap, childIndex, parentIndex) {
  return minHeap[childIndex] < minHeap[parentIndex];
}

function swap(array, i, j) {
  const temp = array[i];
  array[i] = array[j];
  array[j] = temp;
}