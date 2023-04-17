// Given a string s and a dictionary of strings wordDict, add spaces in s to construct a sentence where each word is a valid dictionary word.

// Return all such possible sentences in any order.

// Note: The same word in the dictionary may be reused multiple times in the segmentation.

// Constraints:
// 1 ≤ s.length ≤ 20
// 1 ≤ wordDict.length ≤ 1000
// 1 ≤ wordDict[i].length ≤ 10
// s and wordDict[i] consist of only lowercase English letters.
// All the strings of wordDict are unique.

// T: O(n*k + n^2 + 2^n) -> O(n*k + 2^n)
// S: O((n*2^n) + k)
// where n = length of word, k = # dictionary entries,
function wordBreak(s, wordDict) {
  return wordBreakParts(s, wordDict, {});
}

function wordBreakParts(s, wordDict, result) {
  // Base case
  if (s.length === 0) {
    return [];
  }

  // Memoization fuse
  if (result.hasOwnProperty(s)) {
    return result[s];
  }

  const validSuffixes = [];
  wordDict.forEach((word) => {
    if (s.startsWith(word)) { // T: O(n*k)
      if (word.length === s.length) {
        // Remainder of suffix is the word
        validSuffixes.push(word);
      } else { // T: O(n^2)
        // Suffix needs to be broken down further
        const suffix = s.substring(word.length);
        const suffixes = wordBreakParts(suffix, wordDict, result);
        suffixes.forEach((suffix) => { // T: O(2^n)
          validSuffixes.push(`${word} ${suffix}`.trim());
        });
      }
    }
  });

  // Memoize
  result[s] = validSuffixes;

  return validSuffixes;
}


// Brute Force
function wordBreak_BruteForce(s, wordDict) {
  if (s.length === 0) {
    return [''];
  }
  const validPrefixes = [];
  wordDict.forEach((word) => {
    if (s.startsWith(word)) {
      validPrefixes.push(word);
    }
  });

  const results = [];
  if (validPrefixes) {
    validPrefixes.forEach((prefix) => {
      const suffix = s.substring(prefix.length);
      const suffixes = wordBreak(suffix, wordDict);
      if (suffixes.length) {
        suffixes.forEach((suffix) => {
          results.push(`${prefix} ${suffix}`.trim());
        })
      }
    })
  }

  return results;
}