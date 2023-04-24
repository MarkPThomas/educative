// Given two strings, a and b, return an array of all the start indexes of b's anagrams in a.

// We may return the answer in any order.

// An anagram is a word or phrase created by rearranging the letters of another word or phrase while utilizing each of the original
// letters exactly once.

// Constraints:
// 1 ≤ a.length, b.length ≤ 3 × 10^3
// a and b consist of only lowercase letters.

// T: O(b + a)
// S: O(b + a)
// where a = length of string a, b = length of string b
import tracker from "./freq_track.js";

// You can use the template for frequency count imported above

export function findAnagrams(a, b) {
  const results = [];
  if (b.length > a.length) {
    return results;
  }

  function mapsAreMatching(aFrequencies, bFrequencies) {
    if (Object.keys(aFrequencies).length !== Object.keys(bFrequencies).length) {
      return false;
    }
    for (const [key, value] of Object.entries(bFrequencies)) {
      if (aFrequencies[key] !== value) {
        return false;
      }
    }
    return true;
  }

  const bFrequencies = {};
  const aFrequencies = {};
  for (let i = 0; i < b.length; i++) {
    const charB = b[i];
    if (!bFrequencies[charB]) {
      bFrequencies[charB] = 0;
    }
    bFrequencies[charB]++;

    const charA = a[i];
    if (!aFrequencies[charA]) {
      aFrequencies[charA] = 0;
    }
    aFrequencies[charA]++;
  }
  if (mapsAreMatching(aFrequencies, bFrequencies)) {
    results.push(0);
  }

  let leftIndex = 0;
  let rightIndex = b.length;
  while (rightIndex < a.length) {
    const charLeave = a[leftIndex];
    aFrequencies[charLeave]--;
    if (aFrequencies[charLeave] === 0) {
      delete aFrequencies[charLeave];
    }

    const charEnter = a[rightIndex];
    if (!aFrequencies[charEnter]) {
      aFrequencies[charEnter] = 0;
    }
    aFrequencies[charEnter]++;

    leftIndex++;
    rightIndex++;

    if (mapsAreMatching(aFrequencies, bFrequencies)) {
      results.push(leftIndex);
    }
  }

  return results;
}