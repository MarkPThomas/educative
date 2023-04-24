// Given two strings, “ransom note” and “magazine”, check if the ransom note can be constructed using the letters from the magazine string.

// Return TRUE if a ransom note can be constructed. Otherwise, return FALSE.

// Note: Each letter in the magazine string can only be used once to construct the ransom note.

// Constraints:
// The ransom note and magazine length are between 1 and 10^5.
// The ransom note and magazine consist of lowercase English letters.

// T: O(r + m)
// S: O(r)
// where r = length of ransome note, m = length of magazine
export function canConstruct(ransomNote, magazine) {
  const ransomHash = {};
  for (let i = 0; i < ransomNote.length; i++) {
    const char = ransomNote[i];
    if (!ransomHash[char]) {
      ransomHash[char] = 1;
    } else {
      ransomHash[char]++;
    }
  }


  for (let i = 0; i < magazine.length; i++) {
    const char = magazine[i];
    if (ransomHash[char]) {
      ransomHash[char]--;
      if (ransomHash[char] === 0) {
        delete ransomHash[char];
      }
    }
  }

  return Object.keys(ransomHash).length === 0;
}