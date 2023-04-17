// You're given an integer total and a list of integers called coins.

// The variable coins hold a list of coin denominations, and total is the total amount of money.

// You have to find the minimum number of coins that can make up the total amount by using any combination of the coins.

// If the amount can't be made up, return -1. If the total amount is 0, return 0.

// Note: You may assume that we have an infinite number of each kind of coin.

// Constraints:
// 1 ≤ coins.length ≤ 12
// 1 ≤ coins[i] ≤ 2^31
// 0 ≤ total ≤ 10^3

// T: O(n * m), since all coin types may be checked for each sum state from total down to 0
// S: O(n) for both counter array & recursion stack
// where n = total, m = # coin types available
export function coinChange(coins, total) {
  // Base case that no coins are valid
  if (total < 0) {
    return 0;
  }

  const counter = Array(total + 1).fill(0);
  counter[0] = 1;

  coins.forEach((coinValue) => {
    for (let subTotal = coinValue; subTotal <= total; subTotal++) {
      counter[subTotal] += counter[subTotal - coinValue];
    }
  });
  return counter[total];
}