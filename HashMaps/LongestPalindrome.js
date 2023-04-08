// Given a string, palString, consisting of lowercase or uppercase letters, return the length of the longest palindrome that can be
// built with those letters.

// Note: Letters are case sensitive, for example, "Aa" is not considered a palindrome here.

// Constraints:
// 1 ≤ palString.length ≤ 2000
// palString consists of lowercase or uppercase English letters only.

// T: O(n)
// S: O(1)

export function longestPalindrome(palString) {
  const charCount = {};
  for (let i = 0; i < palString.length; i++) {
    const char = palString[i];
    if (charCount[char] === undefined) {
      charCount[char] = 1;
    } else {
      charCount[char]++;
    }
  }

  let palCount = 0;
  let hasOdd = false;
  for (let char in charCount) {
    if (charCount[char] % 2 === 0) {
      palCount += charCount[char];
    } else {
      hasOdd = true;
      if (charCount[char] > 1) {
        palCount += (charCount[char] - 1);
      }
    }
  }

  if (hasOdd) {
    palCount++;
  }

  return palCount;
}