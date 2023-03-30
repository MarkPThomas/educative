// Given a list of points on a plane, where the plane is a 2-D array with (x, y) coordinates,
// find the k closest points to the origin (0,0).

// Note: Here, the distance between two points on a plane is the Euclidean distance:
// sqrt(x^2+y^2)

import { MaxHeap } from "./max_heap.js";
import { Point } from "./point.js";

export function kClosest(points, k) {
  // Make max heap of size k
  const maxHeap = new MaxHeap();
  for (let i = 0; i < k; i++) {
    const point = new Point(points[i][0], points[i][1]);
    maxHeap.offer([point.distance(), point]);
  }

  // Update heap based on remaining points
  for (let i = k; i < points.length; i++) {
    const point = new Point(points[i][0], points[i][1]);
    if (point.distance() < maxHeap.peek()[0]) {
      maxHeap.poll();
      maxHeap.offer([point.distance(), point]);
    }
  }

  const result = [];
  while (maxHeap.size() > 0) {
    result.push(maxHeap.poll()[1]);
  }

  return result;
}