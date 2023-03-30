// Given a string s containing digits, return a list of all possible valid IP addresses that can be obtained from the string.

// Note: The order in which IP addresses are placed in the list is not important.

// A valid IP address is made up of four numbers separated by dots ., for example 255.255.255.123.

// Each number falls between 0 and 255 (including 0 and 255), and none of them can have leading zeros.

// Constraints:
// The input string s consists of digits only.

// 4 ≤ s.length ≤ 12

function valid(segment) {
  if (3 < segment.length) {
    return false;
  }

  const segmentInt = parseInt(segment);

  return segment[0] !== '0' ? segmentInt <= 255 : segment.length === 1;
}

// this function will append the current list of segments to the list of result.
function updateSegment(s, currentPos, segments, result) {
  // Get last segment & ensure that it is valid
  const segment = s.substring(currentPos + 1, s.length);
  if (valid(segment)) {
    segments.push(segment);
    result.push(segments.join('.'));
    // Remove last increment to begin searching for next variation
    segments.pop();
  }
}

// prevPos: the position of the previously placed dot
// dots: number of dots to place
function backtrack(s, prevPos, dots, segments, result) {
  // Max position must be at least 1 char away from end of string
  // Max position cannot be more than 3 characters away from the last dot position
  const maxPos = Math.min(s.length - 1, prevPos + 4);

  // At a minimum current dot position is 1 character ahead of the previous dot positions
  for (let currentPos = prevPos + 1; currentPos < maxPos; currentPos++) {
    const segment = s.substring(prevPos + 1, currentPos + 1);
    if (valid(segment)) {
      // Continue on path, i.e. place dot
      segments.push(segment);
      // If 3 dots placed, add segments to result
      if (dots - 1 === 0) {
        updateSegment(s, currentPos, segments, result);
      } else {
        // Else, move to next dot
        backtrack(s, currentPos, dots - 1, segments, result);
      }
      // Rewind from path, i.e. remove last dot
      segments.pop();
    }
  }
}

export function restoreIpAddresses(s) {
  const result = [];
  const segments = [];
  // Valid I.P. consists of 4 numbers, so 4 - 1 = 3 dividers are needed
  backtrack(s, -1, 3, segments, result);

  return result;
}