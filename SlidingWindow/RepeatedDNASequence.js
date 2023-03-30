export function findRepeatedSequences(s, k) {
  const hashes = {};
  const repeatingSequences = [];

  // Generate first window hash
  let hash = formHash(s.slice(0, k), k);
  hashes[hash] = 1;

  // Slide window and update hash
  for (let i = k; i < s.length; i++) {
    hash = updateHash(hash, k, s[i], s[i - k])

    if (hashes[hash]) {
      if (hashes[hash] === 1) {
        let substring = s.slice(i - k + 1, i + 1);
        repeatingSequences.push(substring);
      }
      hashes[hash]++
    } else {
      hashes[hash] = 1;
    }
  }

  return repeatingSequences;
}

const charsLength = 4;

function formHash(s, k) {
  let hash = 0;

  for (let i = 0; i < s.length; i++) {
    hash += s[i].charCodeAt() * charsLength ** (k - (i + 1));
  }

  return hash;
}

function updateHash(hash, k, addChar, removeChar = '') {
  if (removeChar) {
    hash -= removeChar.charCodeAt() * charsLength ** (k - 1);
  }
  hash *= charsLength;

  hash += addChar.charCodeAt();

  return hash;
}