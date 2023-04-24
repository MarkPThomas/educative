// For a given string of characters, s, your task is to find the first non-repeating character in it and return its index.

// Return −1 if there’s no unique character in the given string.

// Constraints:
// All letters are in lowercase.

// T: O(2*n) -> O(n)
// S: O(n) -> O(1) since max # chars constant for a given char set
export function firstUniqueChar(s) {
  const frequencies = {};
  for (let i = 0; i < s.length; i++) {
    const char = s[i];
    if (!frequencies[char]) {
      frequencies[char] = 1;
    } else {
      frequencies[char]++;
    }
  }

  for (let i = 0; i < s.length; i++) {
    if (frequencies[s[i]] === 1) {
      return i;
    }
  }
  return -1;
}