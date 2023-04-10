// Suppose you have the list of weights and corresponding values for n items.

// You have a knapsack that can carry a specific amount of weight at a time called capacity.

// You need to find the maximum profit of items using the sum of values of the items you can carry in a knapsack.

// The sum of the weights of the items should be less than or equal to the knapsack’s capacity.

// If any combination can’t make the given knapsack capacity of weights, then return 0.

// Constraints:

// 1 ≤ capacity ≤ 10^4
// 1 ≤ values.length ≤ 10^3

// weights.length == values.length

// 1 ≤ values[i] ≤ 10^4
// 1 ≤ weights[i] ≤ capacity

// T: O(n*c)
// S: O(c)
// where n = # items, c = capacity
export function findMaxKnapSackProfit(capacity, weights, values) {
  const profits = Array(capacity + 1).fill(0);
  for (let item = 0; item < values.length; item++) {
    for (let currentCapacity = capacity; currentCapacity >= 0; currentCapacity--) {
      if (weights[item] <= currentCapacity) {
        // Consider corresponding value for any capacity state that allows weight
        // Also whatever max profit is still available with remaining weight
        const remainingCapacity = currentCapacity - weights[item];
        const remainingProfit = profits[remainingCapacity];
        const currentProfit = values[item] + remainingProfit;

        // Maintain current profit at max allowable state
        profits[currentCapacity] = Math.max(profits[currentCapacity], currentProfit);
      }
      break;
    }
  }

  return profits[capacity];
}