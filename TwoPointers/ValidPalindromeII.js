// Write a function that takes a string as input and checks whether it can be a
//  valid palindrome by removing at most one character from it.

export function isPalindrome(s) {
  let numberOfMismatches = 0;
  let start = 0;
  let end = s.length - 1;

  while (start < end) {
    if (s[start] !== s[end]) {
      numberOfMismatches++;
      if (numberOfMismatches > 1) {
        return false;
      }
      if (s[start + 1] === s[end]) {
        start++;
      } else if (s[end - 1] === s[start]) {
        end--;
      } else {
        return false;
      }
    }
    start++;
    end--;
  }

  return true;
}
