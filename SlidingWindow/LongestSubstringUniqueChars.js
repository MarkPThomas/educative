export function findLongestSubstring(inputString) {
  const characters = {};
  let left = 0;
  let right = 0;
  let longestSubstringLength = -1;

  for (right = 0; right < inputString.length; right++) {
    const currentChar = inputString[right];
    if (currentChar in characters && left <= characters[currentChar]) {
      if (right - left > longestSubstringLength) {
        longestSubstringLength = right - left;
      }
      left = characters[currentChar] + 1;
    }
    characters[currentChar] = right;
  }

  return Math.max(longestSubstringLength, right - left);
}
