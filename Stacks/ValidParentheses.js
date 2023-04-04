// Given a string that may consist of opening and closing parentheses, your task is to check if the string contains valid parenthesization or not.

// The conditions to validate are:

// Every opening parenthesis should be closed by the same kind of parenthesis.

// So, {)and [(]) strings are invalid.

// Every opening parenthesis must be closed in the correct order.

// So, )( and ()(() are invalid.

// Constraints:

// 1 ≤ string.length ≤ 10^4

// The string will only contain the following characters: (, ), [, ], { and }.

export function isValid(string) {
  const openings = {
    '(': ')',
    '[': ']',
    '{': '}'
  }

  const braces = [];
  for (let i = 0; i < string.length; i++) {
    const char = string[i];
    if (braces.length && openings[braces[braces.length - 1]] === char) {
      braces.pop();
    } else {
      braces.push(char);
    }
  }

  return braces.length === 0;
}