export function dfsTree(root) {
  if (root == null) return;
  dfsTree(root.left);
  dfsTree(root.right);
}
