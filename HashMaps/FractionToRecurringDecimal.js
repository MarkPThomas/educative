// Given the two integer values of a fraction, numerator and denominator, implement a function that returns the fraction in string format.
// If the fractional part repeats, enclose the repeating part in parentheses.

// T: O(|d|)
// S: O(|d|)
// where d = denominator
export function fractionToDecimal(numerator, denominator) {
  if (numerator === 0) {
    return '0';
  }

  let result = '';
  if ((numerator > 0 && denominator < 0) || (numerator < 0 && denominator > 0)) {
    result += '-';
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
  }

  let quotient = Math.floor(numerator / denominator);
  result += quotient.toString();
  let remainder = (numerator % denominator) * 10;
  if (remainder === 0) {
    return result;
  }

  result += '.';
  let remainders = {};
  while (remainder) {
    if (remainders[remainder]) {
      result = updateWithRepeating(result, remainders[remainder]);
      break;
    } else {
      remainders[remainder] = result.length;

      quotient = Math.floor(remainder / denominator);
      result += quotient;
      remainder = (remainder % denominator) * 10;
    }
  }

  return result;
}

function updateWithRepeating(result, beginning) {
  const left = result.slice(0, beginning);
  const right = result.slice(beginning);
  return left + '(' + right + ')';
}