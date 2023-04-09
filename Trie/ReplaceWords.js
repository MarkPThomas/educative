// You’re given a sentence consisting of words and a dictionary of root words.

// Your task is to find all the words in the sentence whose prefix matches with a root word present in the dictionary, and then to
// replace each matching word with the root word.

// If a word in a sentence matches more than one root word in the dictionary, replace it with the shortest matching root word, and if
// the word doesn’t match any root word in the dictionary, leave the word unchanged.

// Return the modified sentence as the output.

// Constraints:
// 1 ≤ dictionary.length ≤ 1000

// 1 ≤ dictionary[i].length ≤ 100

// dictionary[i] consists of only lowercase letters.

// 1 ≤ sentence.length ≤ 10^3

// The number of words in sentence is in the range [1,100].

// The length of each word in sentence is in the range [1,100].

// Two consecutive words in sentence should be separated by exactly one space.

// All words in sentence are lowercase.

// T: O(d * w + s * l + s * w)) = O(d * w + 2 * (s * w)) = O((d + 2s) * w -> can reduce to O((2 + s) * w by modifying sentence in place)
// S: O(d * w + s + l) -> can reduce to O(d * w) by returning truncation index & modifying sentence in place.
// d = # words in dictionary, w = longest dictionary word length
// s = # words in sentence, l = longest sentence word length -> = w for match worst case
const SPACE = ' ';

export function replaceWords(sentence, dictionary) {
  const trie = new Trie();
  dictionary.forEach((word) => {  // T: O(d * w), S: O(d * w)
    trie.insert(word);
  })

  const words = sentence.split(SPACE); // T: O(s * l), S: O(s)
  for (let i = 0; i < words.length; i++) {  // T: O(s * w), S: O(l)
    words[i] = trie.shortestWordMatch(words[i]);
  }
  return words.join(SPACE);
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // T: O(w)
  // S: O(w) where w = length of word
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
      }
      node = node.children[char];
    }
    node.isWord = true;
  }

  // T: O(min(w, l)) where w = length of matching word
  // S: O(l) where l = length of search word
  shortestWordMatch(word) {
    let node = this.root;
    let matchingWord = '';
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      const child = node.children[char];

      if (!child) {
        return word;
      }

      matchingWord += char;
      if (child.isWord) {
        return matchingWord;
      }
      node = node.children[char];
    }
    return word;
  }
}