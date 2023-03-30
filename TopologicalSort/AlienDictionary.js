// In this challenge, you are given a list of words written in an alien language, where the words are sorted lexicographically by
// the rules of this language.

// Surprisingly, the aliens also use English lowercase letters, but possibly in a different order.

// Given a list of words written in the alien language, you have to return a string of unique letters sorted in the
// lexicographical order of the alien language as derived from the list of words.

// If there’s no solution, that is, no valid lexicographical ordering, you can return an empty string.

// Note: The lexicographic order of a given language is defined by the order in which the letters of its alphabet appear.

// In English, the letter “n” appears before the letter “r” in the alphabet.

// As a result, in two words that are the same up to the point where one features “n” and the other features “r,”
// the former is considered the lexicographically smaller word of the two.

// For this reason, “ban” is considered lexicographically smaller than “bar.”

// Similarly, if an input contains words followed by their prefix, such as “educated” and then “educate,”
// these cases will never result in a valid alphabet because in a valid alphabet, prefixes are always first.

// Constraints:
// 1 ≤ words.length ≤ 100
// 1 ≤ words[i].length ≤ 20
// All characters in words[i] are English lowercase letters.

import Graph from './graph.js'

export function alienOrder(words) {
  let result = '';
  const adjacencyList = {};
  const inDegreesCount = {};

  // Initialize maps
  for (let i = 0; i < words.length; i++) {
    [...words[i]].forEach((letter) => {
      if (!adjacencyList[letter]) {
        adjacencyList[letter] = [];
      }
      if (!inDegreesCount[letter]) {
        inDegreesCount[letter] = 0;
      }
    })
  }

  // Populate maps
  for (let i = 0; i < words.length - 1; i++) {
    const wordA = words[i];
    const wordB = words[i + 1];
    let index = 0;
    let charA = wordA[index];
    let charB = wordB[index]

    while (charA && charB && charA === charB) {
      // Still Comparing prefixes
      index++;
      charA = wordA[index];
      charB = wordB[index];
    }

    // Check for unresolvable prefix
    if (charB === undefined
      && wordA.length > wordB.length
      && wordA[index - 1] === wordB[index - 1]) {
      return '';
    }

    if (index < wordA.length && index < wordB.length) {
      // Full word hasn't been checked, charA precedes charB
      adjacencyList[charA].push(charB);
      inDegreesCount[charB]++;
    }
  }

  const queue = [''];
  const characters = Object.keys(inDegreesCount);
  while (queue.length) {
    const character = queue.shift();
    result = result.concat(character);

    const children = adjacencyList[character];
    children?.forEach((child) => {
      inDegreesCount[child]--;
    })

    characters.forEach((character) => {
      if (inDegreesCount[character] === 0) {
        queue.push(character);
        inDegreesCount[character]--;
      }
    })
  }

  // Check for cycle on return
  return result.length !== characters.length ? '' : result;
}