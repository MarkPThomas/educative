// Given an array of strings called products and a word to search, design a system that, when each character of the searched
// word is typed, suggests at most three product names from products.

// Suggested products should share a common prefix with the searched word.

// If more than three products exist with a common prefix, return the three product names that appear first in lexicographical order.

// Return the suggested products, which will be a list of lists after each character of searched word is typed.

// Constraints:
// 1 ≤ products.length ≤ 1000
// 1 ≤ products[i].length ≤ 3000
// 1 ≤ sum(products[i].length) ≤ 2×10^3

// All the strings of products are unique.

// products[i] consists of lowercase English letters.

// 1 ≤ searched word.length ≤ 1000

// The searched word consists of lowercase English letters.

import TrieNode from "./trie_node.js";

class Trie {
  constructor(searchLimit = Infinity) {
    this.root = new TrieNode();
    this.searchLimit = searchLimit;
    this.limit = searchLimit;
  }

  // T: O(w)
  // S: O(n * w)
  // where w = length of word
  // where n = number of words
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
        // Note: Child letter order not enforced,
        //   sort after adding child for more robust structure.
        // Overoptimizing for this problem, though, vs. sorting input.
      }
      node = node.children[char];
    }
    node.isWord = true;
  }

  // T: O(p) where p = length of prefix
  // S: O(1)
  getPrefixSuggestions(prefix) {
    const results = [];

    let node = this.getPrefixNode(prefix);
    this.limit = this.searchLimit;
    if (node !== null) {
      this.getSuggestions(prefix, node, results);
    }

    return results;
  }

  // T: O(p) where p = length of prefix
  // S: O(1) since only reassignments are done
  getPrefixNode(prefix) {
    let node = this.root;
    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children[char]) {
        // For incomplete prefix match,
        //   unclear if closest match should be returned,
        //   or none
        return null;
      }
      node = node.children[char];
    }
    return node;
  }

  // T: O(searchLimit*maxWordLength) -> O(1) since chars limited
  // S: O(searchLimit) -> O(1) since chars limited
  getSuggestions(prefix, node, words) {
    if (this.limit <= 0) {
      return;
    }

    if (node.isWord) {
      words.push(prefix);
      this.limit--;
    }

    for (const char in node.children) {
      this.getSuggestions(prefix + char, node.children[char], words);
    }
  }
}

// T: O(n * log(n) + s * log(s) + n * w) = O(n * (w + log(n)) + s * log(s))
// S: O(n * limit) = O(n)
// where n = # of products, w = length of product word, s = length of search word
export function suggestedProducts(products, searchWord) {
  products.sort();
  const SEARCH_LIMIT = 3;
  const trie = new Trie(SEARCH_LIMIT);
  products.forEach((product) => {
    trie.insert(product);
  })

  let allSuggestions = [];
  for (let i = 0; i < searchWord.length; i++) {
    const prefix = searchWord.substring(0, i + 1);
    const suggestions = trie.getPrefixSuggestions(prefix);
    allSuggestions.push(suggestions);
  }

  return allSuggestions;
}