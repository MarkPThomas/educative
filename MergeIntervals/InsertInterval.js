// You’re given an array of non-overlapping intervals, and we need to insert another interval into the array.

// Each interval is a pair of non-negative numbers, the first being the start time and the second being the
// end time of the interval.

// The input array of intervals is sorted in ascending order of start time.

// The intervals in the output must also be sorted by the start time, and none of them should overlap.

// This may require merging those intervals that now overlap as a result of the addition of the new interval.

import { Interval } from "./interval.js";

export function insertInterval(existingIntervals, newInterval) {
  const result = [];

  // Begin with first interval or new interval
  let start = Infinity;
  let end = -Infinity;

  for (let i = 0; i < existingIntervals.length; i++) {
    if (newInterval.start <= end) {
      // merge inserted interval to existing interval
      end = Math.max(end, newInterval.end);
    } else if (
      (result.length === 0 || result[result.length - 1].end < newInterval.start)
      && newInterval.end < existingIntervals[i].start) {
      // insert existing interval before current interval & start new interval
      if (start !== Infinity) {
        result.push(new Interval(start, end));
      }
      start = newInterval.start;
      end = newInterval.end;
    } else if (result.length === 0 && start === Infinity) {
      // insert first interval
      start = Math.min(start, existingIntervals[i].start);
      end = Math.max(end, existingIntervals[i].end);
    }

    if (existingIntervals[i].start <= end) {
      // merge next interval
      end = Math.max(end, existingIntervals[i].end);
    } else {
      // Start new interval
      result.push(new Interval(start, end));
      start = existingIntervals[i].start;
      end = existingIntervals[i].end;
    }
  }

  result.push(new Interval(start, end));
  if (newInterval.start > end) {
    result.push(newInterval);
  }

  return result;
}