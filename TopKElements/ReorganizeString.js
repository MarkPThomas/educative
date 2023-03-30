// Given a string, rearrange it so that any two adjacent characters are not the same.

// If such a reorganization of the characters is possible, output any possible valid arrangement.

// Otherwise, return an empty string.

import MaxHeap from "./max_heap.js";

export function reorganizeString(inputString) {
  const charFreqs = {};
  [...inputString].forEach((char) => {
    charFreqs[char] = charFreqs[char] ? charFreqs[char] + 1 : 1;
  });

  const maxHeap = new MaxHeap();
  Object.keys(charFreqs).forEach((key) => {
    maxHeap.offer([charFreqs[key], key]);
  })

  const result = [];

  function addNextChar(nextCharFreq, nextChar) {
    result.push(nextChar);
    nextCharFreq--;
    if (nextCharFreq > 0) {
      maxHeap.offer([nextCharFreq, nextChar]);
    }
  }

  while (maxHeap.size() > 0) {
    const [nextCharFreq, nextChar] = maxHeap.poll();

    if (result[result.length - 1] === nextChar) {
      if (maxHeap.size() > 0) {
        let [nextNextCharFreq, nextNextChar] = maxHeap.poll();
        addNextChar(nextNextCharFreq, nextNextChar);
      } else {
        return "";
      }
    }
    addNextChar(nextCharFreq, nextChar);
  }

  return result.join('');
}