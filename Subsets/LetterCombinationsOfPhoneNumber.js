// Given a string having digits from 2–9 inclusive, return all the possible letter combinations that can be made from
// the numbers in the string.

// Return the answer in any order.

// Constraints:
// 0 ≤ digits.length ≤ 4 digits[i] is a digit in the range [2,9]

export function letterCombinationsWithRecursion(digits) {
  const digitsToLetters = {
    '1': '',
    '2': 'abc',
    '3': 'def',
    '4': 'ghi',
    '5': 'jkl',
    '6': 'mno',
    '7': 'pqrs',
    '8': 'tuv',
    '9': 'wxyz'
  };

  digits = digits.split('');
  const letters = [];
  digits.forEach((digit) => {
    letters.push(digitsToLetters[digit]);
  });

  if (letters.length === 0) {
    return '';
  }

  return letterCombinationsRecursive(letters, 0);
}

function letterCombinationsRecursive(letters, i) {
  if (i === letters.length - 1) {
    return letters[i].split('');
  }

  const permutations = letterCombinationsRecursive(letters, i + 1);

  const lettersI = [...letters[i]];
  // Handle the case for numbers w/ no letters
  if (lettersI.length === 0) {
    return permutations;
  }

  const result = [];
  lettersI.forEach((letter) => {
    permutations.forEach((permutation) => {
      const newPermutation = letter + permutation;
      result.push(newPermutation);
    });
  });
  return result;
}