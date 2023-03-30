// Given an input string, return all possible permutations of the string.

// Note: The order of permutations does not matter.

export function permuteWord(word) {
  const result = [];

  permuteWordRecursive(word, 0, result);

  return result;
}

function permuteWordRecursive(word, startIndex, result) {
  // Base case: single char -> add original word and stop recursion
  if (startIndex === word.length - 1) {
    result.push(word);
    return;
  }

  for (let j = startIndex; j < word.length; j++) {
    const swappedChars = swapChars(word, startIndex, j);
    permuteWordRecursive(swappedChars, startIndex + 1, result);
  }
}

function swapChars(word, i, j) {
  const wordArray = word.split('');
  const temp = wordArray[i];
  wordArray[i] = wordArray[j];
  wordArray[j] = temp;

  return wordArray.join('');
}