// We are given an integer number n, representing the number of functions running in a single-threaded CPU,
// and an execution log, which is essentially a list of strings.

// Each string has the format {function id}:{"start" | "end"}:{timestamp}, indicating that the function with
// function_id either started or stopped execution at time identified by the timestamp value.

// Each function has a unique ID between 0 and n−1.

// Compute the exclusive time of the functions in the program.

// Note: Exclusive time is the sum of the execution times for all the calls to a specific function.

import { Log } from "./log.js";

// Tip: You may use some of the code templates provided
// in the support files

export function exclusiveTime(n, events) {
  const runtimes = new Array(n).fill(0);
  const eventStack = [];

  events.forEach((event) => {
    const eventLog = new Log(event);
    if (eventLog.isStart) {
      eventStack.push(eventLog);
    } else {
      const endedEvent = eventStack.pop();
      const currentRuntime = eventLog.time - endedEvent.time + 1;
      runtimes[eventLog.id] += currentRuntime;

      if (eventStack.length > 0) {
        // Call is nested, subtract runtime from current parent only
        runtimes[eventStack[eventStack.length - 1].id] -= currentRuntime;
      }
    }
  })

  return runtimes;
}