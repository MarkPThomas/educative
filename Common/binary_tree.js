import { BinaryTreeNode } from "./binary_tree_node.js";

class BinaryTree {
  constructor(args) {
    if (args == null) {
      this.root = new BinaryTreeNode(null);
    } else if (args.length == 1) {
      this.root = new BinaryTreeNode(args[0]);
    } else if (args.length > 1) {
      this.root = null;
      for (var i = 0; i < args.length; i++) {
        var nodeData = args[i];
        if (nodeData != null)
          this.insert(nodeData);
      }
    }
  }

  insert(d) {
    let pNew = new BinaryTreeNode(d);
    if (this.root == null) {
      this.root = pNew;
    } else {
      let parent = new BinaryTreeNode();
      parent = null;
      let pTemp = new BinaryTreeNode();
      pTemp = this.root;
      while (pTemp != null) {
        parent = pTemp;
        if (d <= pTemp.data) {
          pTemp = pTemp.left;
        } else {
          pTemp = pTemp.right;
        }
      }
      if (d <= parent.data) {
        parent.left = pNew;
        // pNew.parent = parent;
      } else {
        parent.right = pNew;
        // pNew.parent = parent;
      }
    }
  }

  findInBSTRec(node, nodeData) {
    if (node == null) {
      return null;
    }
    if (node.data == nodeData) {
      return node;
    } else if (node.data > nodeData) {
      return this.findInBSTRec(node.left, nodeData);
    } else {
      return this.findInBSTRec(node.right, nodeData);
    }
  }

  findInBST(nodeData) {
    return this.findInBSTRec(this.root, nodeData);
  }

  getSubTreeNodeCount(node) {
    if (node == null) {
      return 0;
    } else {
      return (
        1 +
        this.getSubTreeNodeCount(node.left) +
        this.getSubTreeNodeCount(node.right)
      );
    }
  }

  getTreeDeepCopyRec(node) {
    if (node != null) {
      let newNode = new BinaryTreeNode(node.data);
      newNode.left = this.getTreeDeepCopyRec(node.left);
      newNode.right = this.getTreeDeepCopyRec(node.right);
      return newNode;
    } else {
      return null;
    }
  }

  getTreeDeepCopy() {
    if (this.root == null) {
      return null;
    } else {
      var treeCopy = new BinaryTree();
      treeCopy.root = this.getTreeDeepCopyRec(this.root);
      return treeCopy;
    }
  }
}

export { BinaryTree };
