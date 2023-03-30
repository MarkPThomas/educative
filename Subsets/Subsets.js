// Given a set of integers, find all possible subsets within the set.

// Note: The solution set must not contain duplicate subsets.

// Return the solution in any order.

export function findAllSubsets(v) {
  const result = [[]];

  let count = 1;
  for (let i = 0; i < v.length; i++) {
    const addedValue = v[i];

    for (let j = 0; j < count; j++) {
      const copied = [...result[j]];
      copied.push(addedValue);
      result.push(copied);
    }

    count = result.length;
  }

  return result;
}