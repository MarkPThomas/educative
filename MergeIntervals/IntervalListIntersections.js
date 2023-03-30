// For two arrays of closed intervals given as input, intervalListA and intervalListB, where each interval
// has its own start and end time, write a function that returns the intersection of the two interval arrays.

// For example, the intersection of [3,8] and [5,10] is [5,8]

import { Interval } from "./interval.js";

// Function to find the intersecting points between two intervals
export function intervalsIntersection(intervalListA, intervalListB) {
  const results = [];
  let a = 0;
  let b = 0;

  while (a < intervalListA.length && b < intervalListB.length) {
    // Potential start/end points of the intersection
    let start = Math.max(intervalListA[a].start, intervalListB[b].start);
    let end = Math.min(intervalListA[a].end, intervalListB[b].end);

    // The actual intersection
    if (start <= end) {
      results.push(new Interval(start, end));
    }

    // Move forward in the list whose interval ends earlier
    if (intervalListA[a].end < intervalListB[b].end) {
      a++;
    } else {
      b++;
    }
  }

  return results;
}