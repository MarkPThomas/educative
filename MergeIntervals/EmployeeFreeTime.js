// You’re given an array containing the schedules of multiple people.

// Each person’s schedule is an array of non-overlapping intervals in sorted order.

// An interval is specified with the start time and the end time, both being positive integers.

// Your task is to find the list of intervals representing the free time for all the people.

// We’re not interested in the interval from negative infinity to zero or from the end of the last
// scheduled interval in the input to positive infinity.

import { Interval } from "./interval.js";

export function employeeFreeTime(schedule) {
  const result = [];
  const occupied = [];

  // Combine & sort all schedules by start times
  schedule.forEach((employeeSchedule) => occupied.push(...employeeSchedule));
  occupied.sort((a, b) => a.start - b.start);

  const latestEnd = occupied[0].end;
  occupied.forEach((interval) => {
    if (latestEnd < interval.start) {
      result.push(new Interval(latestEnd, interval.start));
    }

    // Update latest end
    latestEnd = Math.max(latestEnd, interval.end);
  })

  return result;
}