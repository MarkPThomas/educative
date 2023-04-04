// Given a string with matched and unmatched parentheses, remove the minimum number of parentheses so that
// the resulting string is a valid parenthesization.


// T: O(N)
// S: O(N)

const OPEN = '(';
const CLOSE = ')';

export function minRemoveParentheses(s) {
  const unbalanced = [];

  for (let i = 0; i < s.length; i++) {
    if (s[i] === OPEN) {
      unbalanced.push([s[i], i]);
    }
    if (s[i] === CLOSE) {
      if (unbalanced.length && unbalanced[unbalanced.length - 1][0] === OPEN) {
        unbalanced.pop();
      } else {
        unbalanced.push([s[i], i]);
      }
    }
  }

  const newString = [];
  let skipIndex = 0;
  for (let i = 0; i < s.length; i++) {
    if (skipIndex < unbalanced.length && i === unbalanced[skipIndex][1]) {
      skipIndex++;
      continue;
    }
    newString.push(s[i]);
  }

  return newString.join('');
}