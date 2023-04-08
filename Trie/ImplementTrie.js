// Trie is a tree-like data structure used to store strings.

// The tries are also called prefix trees because they provide very efficient prefix matching operations.

// Implement a trie data structure with three functions that perform the following tasks:

// Insert a string.
// Search a string.
// Search for a given prefix in a string.

// Constraints:

// 1 ≤ word.length, prefix.length ≤ 2000

// The strings consist only of lowercase English letters.

// At most, 3×10^3 calls in total will be made to the functions.

import Node from "./trie_node.js";

export default class Trie {
  constructor() {
    this.root = new Node();
  }

  // T: O(w)
  // S: O(w)
  //   where w = length of word
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new Node();
      }
      node = node.children[char];
    }
    node.isWord = true;
  }

  // T: O(w)
  // S: O(1)
  //   where w = length of word
  search(word) {
    let node = this.getLastNode(word);
    if (node) {
      return node.isWord;
    } else {
      return false;
    }
  }

  // T: O(p)
  // S: O(1)
  //   where p = length of prefix
  searchPrefix(prefix) {
    let node = this.getLastNode(prefix);
    return node !== null;
  }

  // T: O(w)
  // S: O(1)
  //   where w = length of word
  getLastNode(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        return null;
      }
      node = node.children[char];
    }
    return node;
  }
}