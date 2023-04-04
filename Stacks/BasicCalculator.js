// Given a string containing an arithmetic expression, implement a basic calculator that evaluates the expression string.

// The expression string can contain integer numeric values and should be able to handle the
// “+” and “-” operators, as well as “()” parentheses.

// T: O(n)
// S: O(n)
const OPERATORS = {
  '+': 1,
  '-': -1
}
const OPEN = '(';
const CLOSE = ')';

export function calculator(expression) {
  let integer = 0;
  let sign = 1;
  let result = 0;
  const results = [];

  for (let i = 0; i < expression.length; i++) {
    let newInt = parseInt(expression[i]);
    if (!isNaN(newInt)) {
      integer = newInt + integer * 10;
    } else if (expression[i] in OPERATORS) {
      result += sign * integer;
      integer = 0;

      sign = OPERATORS[expression[i]];
    } else if (expression[i] === OPEN) {
      results.push([sign, result]);
      sign = 1;
      result = 0;
    } else if (expression[i] === CLOSE) {
      result += sign * integer;
      integer = 0;

      const [storedSign, priorResult] = results.pop();
      result = priorResult + storedSign * result;
    }
  }

  if (integer) {
    result += sign * integer;
  }

  return result;
}