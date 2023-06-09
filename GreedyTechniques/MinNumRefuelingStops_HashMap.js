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

import { MaxHeap } from "./maxHeap";

// Note: Initial variable names & terminology were confusing. I tweaked things.
//  For starters, rather than worrying about distance vs. fuel, since car gets 1 mi / 1 liter,
//  I just talk in terms of range ranter than leaving conversion of fuel:distance in mind.

// T: O(n * log(n))
// S: O(n)
// where n = # stations
function minRefuelStops(targetDistance, initialRange, stations) {
    if (initialRange >= targetDistance) {
        return 0;
    }

    const maxDistanceFromStopsAvailable = new MaxHeap();

    let station = 0;
    let stops = 0;
    let currentRange = initialRange;
    // Consider all stations in current range, then stop at station that gives greatest additional range
    // Repeat until target reached or we run out of gas.
    while (currentRange < targetDistance) {
        const [distanceToReach, distanceAddedFromStop] = stations[station];
        if (station < stations.length && distanceToReach <= currentRange) {
            maxDistanceFromStopsAvailable.push(distanceAddedFromStop);
            station++;
        }
        else if (maxDistanceFromStopsAvailable.isEmpty()) {
            return -1;
        }
        else {
            currentRange += maxDistanceFromStopsAvailable.pop();
            stops++;
        }
    }

    return stops;
}