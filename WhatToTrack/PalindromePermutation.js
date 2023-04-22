// For a given string, find whether or not a permutation of this string is a palindrome.

// You should return TRUE if such a permutation is possible and FALSE if it isn’t possible.

// Constraints:
// 1 ≤ string length ≤ 1000
// The string will contain lowercase English letters.

// T: O(n)
// S: O(n) -> O(1) since distinct chars is effectively a constant limited to the alphabet/character set size
export function permutePalindrome(st) {
  const charFrequency = {};

  for (let i = 0; i < st.length; i++) {
    const char = st[i];
    if (!charFrequency[char]) {
      charFrequency[char] = 1;
    } else {
      charFrequency[char]++;
    }
  }

  const values = Object.values(charFrequency);
  let oddNumberCount = false;;
  for (let i = 0; i < values.length; i++) {
    if (values[i] % 2) {
      if (oddNumberCount) {
        return false;
      } else {
        oddNumberCount = true;
      }
    }
  }

  return true;
}