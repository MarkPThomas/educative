// Template for swapping two nodes of the linked list

function swap(node1, node2) {
  let temp = node1.data;
  node1.data = node2.data;
  node2.data = temp;
}

export default swap;
