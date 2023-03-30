// Given a set of n positive integers, find all the possible subsets of integers that sum up to a number k.

// Constraints:
// 1 ≤ n ≤ 10
// 1 ≤ x ≤ 100, where x is any member of the input set 1 ≤ k ≤ 10^3

export function getKSumSubsets(setOfIntegers, targetSum) {
  const subSetsOfIntegers = getAllSubsets(setOfIntegers, targetSum);

  const results = [];

  subSetsOfIntegers.forEach((subset) => {
    const sum = sumSet(subset);
    if (sum === targetSum) {
      results.push(subset);
    }
  })

  return results;
}

function getAllSubsets(sets, targetSum) {
  const subSets = [[]];
  for (let i = 0; i < sets.length; i++) {
    // Optimization: if the current value > target, no need to add any more to it
    if (sets[i] === targetSum) {
      subSets.push([sets[i]]);
    } else if (sets[i] < targetSum) {
      const count = subSets.length;
      for (let j = 0; j < count; j++) {
        const current = [...subSets[j]];
        current.push(sets[i]);
        subSets.push(current);
      }
    }
  }
  return subSets;
}

function sumSet(setOfIntegers) {
  return setOfIntegers.reduce(
    (accumulator, currentValue) => accumulator + currentValue,
    0
  );
}