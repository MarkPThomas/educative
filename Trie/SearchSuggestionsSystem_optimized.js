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

class TrieNode {
  constructor() {
    this.children = {};
    this.searchWords = [];
  }
}

class Trie {
  constructor(searchLimit = Infinity) {
    this.root = new TrieNode();
    this.searchLimit = searchLimit;
  }

  // T: O(w)
  // S: O(w). Actual space taken is larger in this optimized case, but growth trend is the same.
  // where w = length of word
  insert(word) {
    let node = this.root;
    for (let i = 0; i < word.length; i++) {
      const char = word[i];
      if (!node.children[char]) {
        node.children[char] = new TrieNode();
        // Note: Child letter order not enforced,
        //   sort after adding child for more robust structure, with greater time cost for write, but reduced for read.
        // Overoptimizing for this problem, though, vs. sorting input.
      }
      node = node.children[char];

      if (node.searchWords.length < this.searchLimit) {
        node.searchWords.push(word);
      }
    }
  }

  // T: O(p)
  // S: O(p * limit) -> O(p) since limit = constant
  // where p = length of prefix
  getSuggestions(prefix) {
    const suggestions = [];

    let node = this.root;

    for (let i = 0; i < prefix.length; i++) {
      const char = prefix[i];
      if (!node.children[char]) {
        const remainingBlank = Array(prefix.length - i).fill([]);
        return [...suggestions, ...remainingBlank];
      } else {
        node = node.children[char];
        suggestions.push([...node.searchWords]);
      }
    }

    return suggestions;
  }
}

// T: O(n * w + s)
// S: O(n * w + s * limit) = O(n * w + s)
// where n = # of products, w = length of product word, s = length of search word
export function suggestedProducts(products, searchWord) {
  products.sort();
  const SEARCH_LIMIT = 3;
  const trie = new Trie(SEARCH_LIMIT);
  products.forEach((product) => {
    trie.insert(product);
  })

  return trie.getSuggestions(searchWord);
}