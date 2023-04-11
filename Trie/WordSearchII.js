// You are given a list of strings that you need to find in the 2-D grid.

// Neighboring characters can be combined to form strings.

// Remember that the diagonals aren’t included in neighboring characters— only up, down, right, and left neighbors can be considered.

// The solution should return a list containing the strings from the input list that were found in the grid.

// Constraints:
// 1 ≤ rows, columns ≤ 12
// 1 ≤ words.length ≤ 3×10^3
// 1 ≤ words[i].length ≤ 10
// All the strings of words are unique.

// Note: The order of the strings in the output does not matter.

// T: O(i * j * 3^w)
// S: O(n * w)
// where n = # of words, w = max word length, i = # rows, j = # cols
export function findStrings(grid, words) {
  const wordsTrie = new Trie();
  words.forEach((word) => { // T: O(n * w), S: O(n * w)
    wordsTrie.insert(word);
  });

  const wordsPresent = [];
  for (let row = 0; row < grid.length; row++) { // T: O(i * j * 3^w)
    for (let col = 0; col < grid[row].length; col++) {
      search(wordsTrie.root, grid, { row, col }, wordsPresent);   // T: O(3^w), S: O(w)
    }
  }

  return wordsPresent;
}

// T: O(3^w)
// S: O(w)
// where w = max word length
function search(node, grid, coord, words, word = '') {
  if (node.isWord) {
    words.push(word);

    // Remove word from trie to avoid double counting
    node.isWord = false;
  }

  const { row, col } = coord;
  if (0 <= row && row < grid.length && 0 <= col && col < grid[row].length) {
    const char = grid[row][col];
    const child = node.children[char];

    if (child) {
      word += char;

      // Mark coord as visited to avoid reversing or hitting a cycle in the search path
      // Changing & resetting board state is simpler than storing path history in any way
      grid[row][col] = null;

      OFFSETS.forEach((offset) => {         // T: O(3^w), assuming 3 valid directions, as 1 is always reversing
        const nextCoord = {
          row: row + offset.row,
          col: col + offset.col
        }

        search(child, grid, nextCoord, words, word);
      });

      // Reset coord state as path search backtracks
      grid[row][col] = char;
    }
  }
}

const OFFSETS = [
  { row: 0, col: 1 },
  { row: 0, col: -1 },
  { row: 1, col: 0 },
  { row: -1, col: 0 },
]

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
}