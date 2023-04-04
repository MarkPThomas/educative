// Given an integer array, matchsticks, where matchsticks[i] is the length of the ith matchstick.

// Use every single matchstick to create a square.

// No stick should be broken, although they can be connected, and each matchstick can only be used once.

// Return TRUE if we can make this square and FALSE otherwise.

export function matchstickToSquare(matchsticks) {
  const numSides = 4;

  if (matchsticks.length < numSides) {
    return false;
  }

  const totalLength = matchsticks.reduce((acc, curr) => acc + curr, 0);
  if (totalLength < numSides || totalLength % numSides) {
    return false;
  }

  const sideLength = totalLength / numSides;
  matchsticks.sort((a, b) => b - a);

  let usedIndexSmaller = {};
  for (let i = 0; i < numSides; i++) {
    if (matchsticks[i] > sideLength) {
      return false;
    }

    if (matchsticks[i] === sideLength) {
      continue;
    }

    let j = i;
    while (matchsticks[i] + matchsticks[j] !== sideLength && j < matchsticks.length) {
      j++;
      while (usedIndexSmaller[j]) {
        j++;
      }
    }
    usedIndexSmaller[j] = 1;
    if (j === matchsticks.length) {
      return false;
    }
  }

  return true;
}
