// We are given an array of words or phrases, and we need to group the words that are anagrams of each other.

// An anagram is a word or phrase formed from another word by rearranging its letters.

// Constraints:

// Let strs be the array of strings given as input to find the anagrams.
// 1 ≤ strs.length ≤ 10^4
// 0 ≤ strs[i].length ≤ 100
// strs[i] consists of lowercase English letters.

// Note: The order in which the output is displayed doesn’t matter.

// T: O(n * k)
// S: O(n * k)
// where n = # words in the input, k = max # chars in any word
export function groupAnagrams(strs) {
  const anagrams = {};

  strs.forEach((string) => {
    const key = new Array(26).fill(0);
    for (let i = 0; i < string.length; i++) {
      const charNum = string.charCodeAt(i) - 'a'.charCodeAt();
      key[charNum]++;
    }

    if (!anagrams[key]) {
      anagrams[key] = [string];
    } else {
      anagrams[key].push(string);
    }
  });

  return Object.values(anagrams);
}