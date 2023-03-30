// You’re given a list of words with lowercase English letters in a different order, written in an alien language.

// The order of the alphabet is some permutation of lowercase letters of the English language.

// We have to return TRUE if the given list of words is sorted lexicographically in this alien language.

// Constraints:
// 1 ≤ words.length ≤ 100
// 1 ≤ words[i].length ≤ 20 order.length == 26

// All the characters in words[i] and order are lowercase English letters.

export function verifyAlienDictionary(words, order) {
  const ranking = {};
  for (let i = 0; i < order.length; i++) {
    ranking[order[i]] = i;
  }

  for (let i = 0; i < words.length - 1; i++) {
    const wordA = words[i];
    const wordB = words[i + 1];
    let index = 0;

    // Get index of first differing char
    while (wordA[index] && wordB[index] && wordA[index] === wordB[index]) {
      index++;
    }

    // Check for reverse-order prefix
    if (wordB[index] === undefined && wordA[index]) {
      return false;
    }

    // Check ranking
    if (ranking[wordB[index]] < ranking[wordA[index]]) {
      return false;
    }
  }

  return true;
}