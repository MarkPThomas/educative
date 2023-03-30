// Given strings str1 and str2, find the minimum (contiguous) substring subStr of str1,
// such that every character of str2 appears in subStr in the same order as it is present in str2

export function minWindow(str1, str2) {
  let length = Infinity;
  let minSubsequence = '';

  let indexS2 = 0;
  for (let indexS1 = 0; indexS1 < str1.length; indexS1++) {
    if (str1[indexS1] === str2[indexS2]) {
      indexS2++;
    }

    if (indexS2 === str2.length) {
      let start = indexS1;
      const end = start + 1;
      indexS2--;

      while (indexS2 >= 0) {
        if (str1[start] === str2[indexS2]) {
          indexS2--;
        }
        start--;
      }
      start++;

      if (end - start < length) {
        length = end - start;
        minSubsequence = str1.slice(start, end);
      }
    }
  }

  return minSubsequence;
}
