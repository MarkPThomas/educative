// A happy number is a number defined by the following process:

// Starting with any positive integer, replace the number by the sum of the squares of its digits.

// Repeat the process until the number equals 1 (where it will stay), or it loops endlessly in a
// cycle which does not include 1.

// Those numbers for which this process ends in 1 are happy.

import sumDigits from "./sum_of_digits.js";

export function isHappyNumber(n) {
  let fast = n;
  let slow = n;

  do {
    fast = sumDigits(sumDigits(fast));
    slow = sumDigits(slow);
  } while (fast !== slow && fast !== 1)

  return fast === 1;
}