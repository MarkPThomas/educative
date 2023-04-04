// Given a string consisting of lowercase English letters, repeatedly remove adjacent duplicate letters, one pair at a time.

// Both members of a pair of adjacent duplicate letters need to be removed.

// T: O(n)
// S: O(n)
export function removeDuplicates(string) {
  const chars = [];

  for (let i = 0; i < string.length; i++) {
    if (!chars.length || chars[chars.length - 1] !== string[i]) {
      chars.push(string[i]);
    } else {
      chars.pop();
    }
  }

  return chars.join('');
}