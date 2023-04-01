// There are n gas stations along a circular route, where the amount of gas at the ith station is gas[i].

// We have a car with an unlimited gas tank and it costs cost[i] of gas to travel from the ith station
// to its next (i+1) th station.

// We begin the journey with an empty tank at one of the gas stations.

// Given two integer arrays, gas and cost, return the starting gas station’s index if we can travel
// around the circuit once in the clockwise direction.

// Otherwise, return −1.

// If there exists a solution, it is guaranteed to be unique.

// T: O(n)
// S: O(1)
export function gasStationJourney(gas, cost) {
  const totalCost = cost.reduce((acc, curr) => acc + curr, 0);
  const totalGas = gas.reduce((acc, curr) => acc + curr, 0);
  if (totalCost > totalGas) {
    return -1;
  }

  let startStation = 0;
  let currentGas = 0;
  for (let station = 0; station < gas.length; station++) {
    currentGas += (gas[station] - cost[station]);
    if (currentGas < 0) {
      currentGas = 0;
      startStation = station + 1;
    }
  }

  return startStation;
}

// T: O(n^2)
// S: O(1)
export function gasStationJourneyNaiive(gas, cost) {
  const totalCost = cost.reduce((acc, curr) => acc + curr, 0);
  const totalGas = gas.reduce((acc, curr) => acc + curr, 0);
  if (totalCost > totalGas) {
    return -1;
  }

  for (let startStation = 0; startStation < gas.length; startStation++) {
    let currentGas = 0;
    let currentStation = startStation;
    let refills = 0;

    while (refills < gas.length) {
      currentGas += (gas[currentStation] - cost[currentStation]);
      if (currentGas < 0) {
        break;
      }
      refills++;

      currentStation = startStation + refills;
      if (currentStation >= gas.length) {
        currentStation -= gas.length;
      }
    }

    if (currentGas >= 0) {
      return startStation;
    }
  }

  return -1;
}