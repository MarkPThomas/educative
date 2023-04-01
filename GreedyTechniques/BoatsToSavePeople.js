// You’re given an array, people, where people[i] is the weight of the ith person,
// and an infinite number of boats, where each boat can carry a maximum weight, limit.

// Each boat carries, at most, two people at the same time.

// This is provided that the sum of the weight of those people is under or equal to the weight limit.

// You need to return the minimum number of boats to carry every person in the array.

export function rescueBoats(people, limit) {
  let boats = 0;

  people.sort((a, b) => a - b);
  let lightest = 0;
  let heaviest = people.length - 1;

  while (heaviest >= lightest) {
    boats++;
    if (limit - people[heaviest] >= people[lightest]) {
      lightest++;
    }
    heaviest--;
  }
  return boats;
}