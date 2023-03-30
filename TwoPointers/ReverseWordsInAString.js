export function reverseWords(sentence) {
  const sentenceAsWords = sentence.split(' ');
  const reversedSentence = [];

  for (let i = sentenceAsWords.length - 1; i >= 0; i--) {
    if (sentenceAsWords[i]) {
      reversedSentence.push(sentenceAsWords[i])
    }
  }

  return reversedSentence.join(' ');
}

export function reverseWordsOld(sentence) {
  const reversedSentence = sentence.replace(' ', '').split('').reverse();

  let start = 0;
  let end = start;

  while (end < reversedSentence.length) {
    const spaceIndex = getNextSpaceIndex(reversedSentence, end);
    end = spaceIndex - 1;
    reverseWord(reversedSentence, start, end);
    start = spaceIndex + 1;
    end = start;
  }

  return reversedSentence.join(' ');
}

function reverseWord(sentence, start, end) {
  while (start < end) {
    swap(sentence, start, end);
    start++;
    end--;
  }
}

function swap(sentence, start, end) {
  const tempChar = sentence[start];
  sentence[start] = sentence[end];
  sentence[end] = tempChar;
}

function getNextSpaceIndex(sentence, index) {
  while (index < sentence.length && sentence[index] !== ' ') {
    index++;
  }
  return index;
}