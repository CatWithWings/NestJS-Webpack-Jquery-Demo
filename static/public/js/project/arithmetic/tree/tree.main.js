import BinarySearchTree from './binarySearchTree';
import AvlTree from './avlTree';
import RedBlackTree from './redBlackTree';

class TreeApp {
  constructor() {
    this.BST = new BinarySearchTree();
    this.AVL = new AvlTree();
    this.redBlackTree = new RedBlackTree();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  setBST() {
    const result = this.BST.insert(10)
      .insert(3)
      .insert(2)
      .insert(5)
      .insert(4)
      .insert(9)
      .insert(8)
      .insert(9)
      .insert(18)
      .insert(13)
      .insert(21)
      .print();

    $('#BST').empty().append(result);
  }

  delBST() {
    this.BST.remove(3);
    const result = this.BST.print();

    $('#BST').empty().append(result);
  }

  setAVL() {
    const result = this.AVL.insert(50)
      .insert(30)
      .insert(70)
      .insert(10)
      .insert(40)
      .insert(35)
      .print();
    $('#AVL').empty().append(result);
  }

  setRedBlack() {
    const result = this.redBlackTree.insert(80)
      .insert(40)
      .insert(20)
      .insert(60)
      .insert(10)
      .insert(50)
      .insert(120)
      .insert(100)
      .insert(140)
      .insert(90)
      .insert(10)
      .insert(30);

    console.log('red black -->', this.redBlackTree.root);
    // $('#redBlack').empty().append(result);
  }

  bindEvents() {
    $('#setBST').on('click', () => this.setBST());
    $('#delBST').on('click', () => this.delBST());
    $('#setAVL').on('click', () => this.setAVL());
    $('#setRedBlack').on('click', () => this.setRedBlack());
  }
}

new TreeApp();
