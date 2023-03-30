// Given two strings—s and t, find the smallest window substring of t.

// The smallest window substring is the shortest sequence of characters in s that includes all of the
// characters present in t.

// The frequency of each character in this sequence should be greater than or equal to the frequency of
// each character in t.

// The order of the characters doesn’t matter here.

export function minWindow(s, t) {
  if (t === '') {
    return '';
  }

  // Establish frequency count & initialize window
  const rCount = {};
  for (let c of t) {
    rCount[c] = 1 + (rCount[c] ? rCount[c] : 0);
  }

  // Establish sliding window
  const window = {};
  const required = Object.keys(rCount).length;
  let current = 0;

  let result = [-1, -1];
  let resultLength = Infinity;
  let left = 0;
  let right = 0;

  for (right = 0; right < s.length; right++) {
    const c = s[right];

    window[c] = 1 + (window[c] ? window[c] : 0);

    if (c in rCount && window[c] === rCount[c]) {
      current++;
    }

    while (current === required) {
      // Update our result if shorter
      if (right - left + 1 < resultLength) {
        result = [left, right];
        resultLength = right - left + 1;
      }
      // Pop from the left of our window until current < required
      window[s[left]]--;
      if (s[left] in rCount && window[s[left]] < rCount[s[left]]) {
        current--;
      }
      left++;
    }

  }

  left = result[0];
  right = result[1];
  return resultLength !== Infinity ? s.substring(left, right + 1) : '';
}