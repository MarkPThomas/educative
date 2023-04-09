// Given an integer value n, write a function that returns all the numbers in the range 1 to n in lexicographical order.

// Constraints:

// 1 ≤ n ≤ 5×10^4

// T: O(n)
// S: O(n + m) -> O(n) as m << n & m is constant in longer ranges as n increases
// where n = max # specified, m = order of magnitude of max #, coincides with trie depth for recursion stack
export function lexicographicalOrder(n, base = 10) {
  const lexiNums = new Trie(base);
  lexiNums.generateTo(n);               // T: O(n), S: O(n)

  return lexiNums.inOrderTraversal();   // T: O(n), S: O(m)
}

class TrieNode {
  constructor() {
    this.children = {};
  }
}

class Trie {
  constructor(base = 10) {
    this.root = new TrieNode();
    this.BASE = base;
  }

  // T: O(n)
  // S: O(n)
  generateTo(n) {
    let factor = 1;
    let i = 1;
    while (i <= n) {
      let node = this.root;

      // Get node for correct base multiple
      if (i >= factor * this.BASE) {
        factor *= this.BASE;
      }

      let scale = 1;
      while (scale < factor) {
        let key = Math.floor(i * (scale / factor));
        node = node.children[key];
        scale *= this.BASE;
      }

      // Reduce by 1 to leave out '0' in first set of children
      const maxLength = (scale === 1) ? this.BASE - 1 : this.BASE;

      // Add up to the next 10 children to the node
      let length = Math.min(maxLength, n - i + 1);
      for (let j = 0; j < length; j++) {
        if (!node.children[i]) {
          node.children[i] = new TrieNode();
        }
        i++;
      }
    }
  }

  // T: O(n)
  // S: O(m)
  // where n = max # specified, m = order of magnitude of max #, coincides with trie depth for recursion stack
  inOrderTraversal() {
    const numbers = [];

    this.inOrderTraversalRecursion(this.root, numbers);

    return numbers;
  }

  inOrderTraversalRecursion(node, numbers) {
    for (const key in node.children) {
      numbers.push(parseInt(key));
      this.inOrderTraversalRecursion(node.children[key], numbers);
    }
  }
}

let results = [];
results.push(lexicographicalOrder(5));
results.push(lexicographicalOrder(10));
results.push(lexicographicalOrder(12));
results.push(lexicographicalOrder(15));
results.push(lexicographicalOrder(20));
results.push(lexicographicalOrder(395));
results.push(lexicographicalOrder(395, 8));

console.log(results);