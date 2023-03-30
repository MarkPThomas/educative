// Given an (n×n) matrix where each row and column is sorted in ascending order,
// find the kth smallest element in the matrix.

// Constraints:
// If k > total elements of the matrix, return the greatest element from the matrix.

import { MinHeap } from "./minHeap.js";

export function kthSmallestNumber(matrix, k) {
  const minHeap = new MinHeap();
  let result = [];
  // Add column to minHeap
  for (let columnIndex = 0;
    columnIndex < matrix.length;
    columnIndex++) {

    if (matrix[columnIndex].length === 0) {
      return [];
    }
    minHeap.offer([
      matrix[columnIndex][0],
      {
        rowIndex: 0,
        column: matrix[columnIndex]
      }
    ]);
  }

  let counter = 1;
  let minElement;
  while (minHeap.size() > 0 && counter <= k) {
    // Get min number & add element from next row in column
    minElement = minHeap.poll();
    result = minElement[0];
    let { rowIndex, column } = minElement[1];
    rowIndex++;
    if (rowIndex < column.length) {
      minHeap.offer([
        column[rowIndex],
        {
          rowIndex,
          column
        }
      ]);
    }
    counter++;
  }

  return result;
}