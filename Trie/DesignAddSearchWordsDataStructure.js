// Design a data structure that supports the functions that add new words, find a string matches a previously added string,
// and return all words in the data structure.

// Let’s call this data structure the WordDictionary class.

// Here’s how it should be implemented:

// Init(): This function will initialize the object.

// Add word(word): This function will add a word to the data structure so that it can be matched later.

// Search word(word): This function will return TRUE if there is any string in the WordDictionary object that matches the query word.

// Otherwise, it will return FALSE.

// If the query word contains dots, ., then it should be matched with every letter.

// For example, the dot in the string “.ad” can have 26 possible search results like “aad”, “bad”, “cad”, and so on.

// Get words(): This function will return all of the words present in the WordDictionary class.

// Constraints
// 1 ≤ word.length ≤ 25

// Words in add word() consist of lowercase English letters.

// Words in search word() consist of . or lowercase English letters.

// There will be, at most, three dots in a word for search queries.

// At most, 10^3 calls will be made to add word() and search word().

// Note: You can’t add a word that is already present in the dictionary.

// Note: I have added optimizations that reduced the average time & space complexity of each method.
class WordDictionary {
  constructor() {
    this.trie = new Trie();
  }

  // T: O(m)
  // S: O(n * m)
  // where n = # of words, m = longest word length
  addWord(word) {
    this.trie.insert(word);
  }

  // T: O(n * C ^ m)
  // S: O(n * m)
  // where n = # of words, m = longest word length, C = 26 = length of lowercase English alphabet
  getWords() {
    return this.trie.getAllWords();
  }

  // T: O(m) w/o wildcards, O(C^m) w/ wildcards
  // S: O(n * m)
  // where n = # of words, m = longest word length, C = 26 = length of lowercase English alphabet
  searchWord(word) {
    return this.trie.search(word);
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isWord = '';
  }
}

class Trie {

  constructor() {
    this.root = new TrieNode();

    this.SKIP_CHAR = '.';

    this.CHAR_MAP = {};
    const CHARS_LENGTH = 26;
    const CHARS_START_CODE = 'a'.charCodeAt();
    for (let i = 0; i < CHARS_LENGTH; i++) {
      this.CHAR_MAP[String.fromCharCode(CHARS_START_CODE + i)] = i;
    }
  }

  insert(word) {
    let node = this.root;

    for (let i = 0; i < word.length; i++) {
      const charIndex = this.CHAR_MAP[word[i]];
      if (!node.children[charIndex]) {
        node.children[charIndex] = new TrieNode();
      }
      node = node.children[charIndex];
    }
    node.isWord = word;
  }

  getAllWords() {
    return this.getWords(this.root);
  }

  // Preorder DFS
  getWords(node, words = []) {
    if (node.isWord) {
      words.push(node.isWord);
    }

    for (const childKey in node.children) {
      const child = node.children[childKey];
      words = this.getWords(child, words);
    }

    return words;
  }

  search(word, node = null) {
    node = (node === null) ? this.root : node;

    // Check initial wild card
    const firstChar = word[0];
    if (firstChar === this.SKIP_CHAR) {
      const subWord = word.substring(1);
      for (const childKey in node.children) {
        const child = node.children[childKey];
        if (this.search(subWord, child)) {
          return true;
        }
      }
      return false;
    }

    // Check perfect match
    let trailingSkipsIndex = 0;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (char === this.SKIP_CHAR) {
        trailingSkipsIndex = i;
        break;
      }
      const charCode = this.CHAR_MAP[char];
      if (!node.children[charCode]) {
        return false;
      }
      node = node.children[charCode];
    }

    // Check trailing wildcard
    if (trailingSkipsIndex) {
      // Ensure remaining characters are all skip
      for (let i = trailingSkipsIndex + 1; i < word.length; i++) {
        if (word[i] !== this.SKIP_CHAR) {
          return false;
        }
      }
      return this.isWordByLevel(word.length - trailingSkipsIndex, node);
    } else {
      return node.isWord.length > 0;
    }
  }

  isWordByLevel(level, node) {
    if (level === 0) {
      return node.isWord.length > 0;
    }

    for (const childKey in node.children) {
      const child = node.children[childKey];
      if (this.isWordByLevel(level - 1, child)) {
        return true;
      }
    }
    return false;
  }
}

// ["WordDictionary", "addWord",  "addWord",  "addWord",  "getWords", "searchWord", "searchWord", "searchWord", "searchWord", "getWords"]
// [[],               ["bad"],    ["dad"],    ["mad"],    [],         ["pad"],      ["bad"],      [".ad"],      ["b.."],      []]

const wordDictionary = new WordDictionary();
wordDictionary.addWord('bad');
wordDictionary.addWord('dad');
wordDictionary.addWord('mad');

const words = wordDictionary.getWords();

let hasWord = wordDictionary.searchWord('pad');
hasWord = wordDictionary.searchWord('bad');
hasWord = wordDictionary.searchWord('.ad');
hasWord = wordDictionary.searchWord('b..');


const words2 = wordDictionary.getWords();
