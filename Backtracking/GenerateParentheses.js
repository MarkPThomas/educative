// For a given number, n, generate all combinations of balanced parentheses.

// Constraints:
// 1 ≤ n ≤ 8

export function generateCombinations(n) {
  const result = [];
  const output = [];
  backtrack(n, 0, 0, output, result);

  return result;
}

const OPEN = '(';
const CLOSE = ')';

function backtrack(n, openParenthesesCount, closeParenthesesCount, output, result) {
  // Base case, valid result
  if (openParenthesesCount === n && closeParenthesesCount === n) {
    result.push(output.join(''));
  }

  // Case of adding opening brace
  if (openParenthesesCount < n) {
    output.push(OPEN);
    backtrack(n, openParenthesesCount + 1, closeParenthesesCount, output, result);
    output.pop();
  }

  // Case of adding closing brace
  if (closeParenthesesCount < openParenthesesCount) {
    output.push(CLOSE);
    backtrack(n, openParenthesesCount, closeParenthesesCount + 1, output, result);
    output.pop();
  }
}