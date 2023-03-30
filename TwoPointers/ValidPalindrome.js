export function isPalindrome(s) {
  let left = 0;
  let right = s.length - 1;

  while (left <= right) {
    left++;
    right--;

    if (s[left] !== s[right]) {
      return false;
    }
  }
  return true;
}

const inputs = [

];

const expected = [

];