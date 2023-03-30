export class BinaryTreeNode {
  constructor(data) {
    this.data = data;
    this.left = null;
    this.right = null;

    // below data member is only used for printing
    this.printData = String(data);

    // below data members used only for some of the problems
    this.next = null;
    this.parent = null;
    this.count = 0;
  }
}
