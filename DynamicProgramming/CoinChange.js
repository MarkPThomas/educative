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
  if (total < 1) {
    // Base case that no coins are needed
    return 0;
  }

  const counter = Array(total + 1).fill(Infinity);
  return minCoins(total, counter, coins);
}

function minCoins(remainingSum, counter, coins) {
  // Base cases
  if (remainingSum === 0) {
    // Case is complete
    return 0;
  }
  if (remainingSum < 0) {
    // Case determined to be unworkable.
    // Backtrack by not including this result
    return -1;
  }
  if (counter[remainingSum] !== Infinity) {
    // Case already determined, no more modification needed
    return counter[remainingSum];
  }

  // Set counter for current remaining sum
  let currentMinCoins = Infinity;
  coins.forEach((coin) => {
    let result = minCoins(remainingSum - coin, counter, coins);
    if (0 <= result && result < currentMinCoins) {
      // +1 indicates the coin tested in the minCoins was able to be used for this remaining sum case, so is included in the current min count
      currentMinCoins = result + 1;
    }
  });

  if (currentMinCoins === Infinity) {
    // Not possible to reach this sum case, as it was not updated
    counter[remainingSum] = -1;
  } else {
    // Assign updated value to this sum case
    counter[remainingSum] = currentMinCoins;
  }

  return counter[remainingSum];
}