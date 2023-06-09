// Develop a program to find the minimum number of refueling stops that a car needs to make to cover
// a distance, target.

// For simplicity, assume that the car has to travel from west to east in a straight line.
// There are various fuel stations on the way, which can be represented as a 2-D array of stations,
// i.e., stations[i] = [d_i ,f_i], where d_i is the distance in miles of the ith gas station from the
// starting position, and f_i is the amount of fuel in liters that it stores.

//  Initially, the car starts with k liters of fuel.

//  The car consumes one liter of fuel for every mile traveled.

//  Upon reaching a gas station, the car can stop and refuel using all the petrol stored at the station.

//  In case it cannot reach the target, the program simply returns −1.

// Note:
// If the car reaches a station with 0 fuel left, it can refuel from that station, and all the fuel
// from that station can be transferred to the car.

// If the car reaches the target with 0 fuel left, it is still considered to have arrived.

// Note: Initial variable names & terminology were confusing. I tweaked things.
//  For starters, rather than worrying about distance vs. fuel, since car gets 1 mi / 1 liter,
//  I just talk in terms of range ranter than leaving conversion of fuel:distance in mind.

// T: O(n^2)
// S: O(n)
export function minRefuelStops(targetDistance, initialRange, stations) {
  const rangeWithNStops = new Array(stations.length + 1).fill(0);
  rangeWithNStops[0] = initialRange;

  for (let i = 0; i < stations.length; i++) {
    const [distanceToReach, rangeAdded] = stations[i];

    for (let j = i; j >= 0; j--) {
      // If station distance at this step <= max distance reachable at this step, consider it.
      if (distanceToReach <= rangeWithNStops[j]) {
        // Current step, j, is for if all stations were visited up to the station considered.
        // Working backwards updates prior steps to max distance if ordering of multiple reachable
        //   stations at that step is changed such that distance is increased.
        const rangeWithCurrentStop = rangeWithNStops[j] + rangeAdded;
        const rangeWithNextStop = rangeWithNStops[j + 1];
        rangeWithNStops[j + 1] = Math.max(rangeWithNextStop, rangeWithCurrentStop);
      }
    }
  }

  // With optimal ordering of stations/step for max distance/station visited
  //   choose fewest steps to reach target
  for (let i = 0; i <= stations.length; i++) {
    if (targetDistance <= rangeWithNStops[i]) {
      return i;
    }
  }

  return -1;
}