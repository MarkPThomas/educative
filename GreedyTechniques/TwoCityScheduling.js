// A company is planning to interview 2n people.

// You're given the array costs where costs[i] = [aCost_i, bCost_i].

// The cost of flying the ith person to city A is aCost_i,
// and the cost of flying the ith person to city B is bCost_i.

// Return the minimum cost to fly every person to a city such that exactly n people arrive in each city.

export function twoCityScheduling(costs) {
  const costDifferences = [];
  for (let i = 0; i < costs.length; i++) {
    let costDifference = costs[i][0] - costs[i][1];
    costDifferences.push([costDifference, costs[i]]);
  }

  costDifferences.sort((a, b) => a[0] - b[0]);

  let totalCost = 0;
  for (let i = 0; i < costs.length / 2; i++) {
    totalCost += costDifferences[i][1][0];
    totalCost += costDifferences[costs.length - i - 1][1][1];
  }

  return totalCost;
}