// Given a number n, calculate the corresponding Tribonacci number.

// The Tribonacci sequence T_n is defined as:
// T_0 = 0, T_1 = 1, T_2 = 1, and T_n+3 = T_n + T_n+1 +T_n+2, for n >= 0

// The input number, n, is a non-negative integer.

// Constraints:
// 0 ≤ n ≤ 37
// The answer is guaranteed to fit within a 32-bit integer, i.e., answer ≤ 2^31

// T: O(n)
// S: O(1)
// This is a bottom up strategy
export function findTribonacci(n) {
  const results = [0, 1, 1];

  if (n < 3) {
    return results[n];
  } else {
    for (let i = 3; i <= n; i++) {
      let nextResult = results[0] + results[1] + results[2];
      results[0] = results[1];
      results[1] = results[2];
      results[2] = nextResult;
    }
    return results[2];
  }
}