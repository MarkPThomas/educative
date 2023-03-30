// We’re given an array of closed intervals as input where each interval has a start and end timestamp.
// The input array is sorted by starting timestamps.
// Merge the overlapping intervals and return a new output array.

import { Interval } from "./interval.js";

export function mergeIntervals(v) {
  const result = [];
  let start = v[0].start;
  let end = v[0].end;


  for (let i = 0; i < v.length; i++) {
    if (v[i].start <= end) {
      end = Math.max(end, v[i].end);
    } else {
      result.push(new Interval(start, end));
      start = v[i].start;
      end = v[i].end;
    }
  }
  result.push(new Interval(start, end));

  return result;
}
