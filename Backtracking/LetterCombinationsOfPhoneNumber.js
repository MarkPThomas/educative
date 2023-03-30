// Given a string having digits from 2–9 inclusive, return all the possible letter combinations that can be made from
// the numbers in the string.

// Return the answer in any order.

// Constraints:
// 0 ≤ digits.length ≤ 4 digits[i] is a digit in the range [2,9]

export function letterCombinations(digits) {
  const combinations = [];
  if (digits.length === 0) {
    return combinations;
  }

  const digitsToLetters = {
    '1': ' ',
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  backtrack(0, digits, digitsToLetters, combinations);

  return combinations;
}

function backtrack(digitIndex, digits, letters, combinations, path = []) {
  if (path.length === digits.length) {
    combinations.push(path.join('').split(' ').join(''));
    return;
  }

  const possibleLetters = letters[digits[digitIndex]];
  if (possibleLetters) {
    for (let i = 0; i < possibleLetters.length; i++) {
      path.push(possibleLetters[i]);
      backtrack(digitIndex + 1, digits, letters, combinations, path);
      path.pop();
    }
  }
}