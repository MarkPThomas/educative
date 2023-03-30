// Given an array where the element at the index i represents the price of a stock on day i,
// find the maximum profit that you can gain by buying the stock once and then selling it.

// Stock can only be purchased on a single day and sold on a different day.

// If no profit can be achieved, we return zero.

// We can’t sell before buying a stock, that is, the array index at which stock is bought will
// always be less than the index at which the stock is sold.

export function maxProfit(stockPrices) {
  let maxProfit = 0;
  let left = 0;
  for (let right = 1; right < stockPrices.length; right++) {
    if (stockPrices[left] < stockPrices[right]) {
      const currentProfit = stockPrices[right] - stockPrices[left];
      maxProfit = Math.max(maxProfit, currentProfit);
    } else {
      left = right;
    }
  }
  return maxProfit;
}
