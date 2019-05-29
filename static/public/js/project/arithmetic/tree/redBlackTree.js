// http://www.cnblogs.com/skywang12345/p/3245399.html

const COLORS = {
  red: 'red',
  black: 'black'
}

const inOrderTraverseNode = Symbol('inOrderTraverseNode');
const preOrderTraverseNode = Symbol('preOrderTraverseNode');
const postOrderTraverseNode = Symbol('postOrderTraverseNode');

class Node {
  constructor(data, color) {
    this.prev = null; // 父节点
    this.data = data;
    this.left = null;
    this.right = null;
    this.color = color;
  }
}

export default class RedBlackTree {
  constructor() {
    this.root = null;
  }

  isRed(node) {
    if(!node) return false;
    return node.color === COLORS.red;
  }

  insert(data) {
    this.root = this.insertNode(this.root, data);
    // this.inOrderTraverse((node) => {
    //   if (node.prev) {
    //     this.handleRotation(node, node.prev);
    //   }
    // });
    return this;
  }

  /**
   * 
   * @param {*} node 
   * @param {*} data 
   * @param {?*} prev 父节点
   */
  insertNode(node, data, prev) {
    const setPrev = (prevNode, newNode) => {
      if(newNode === null) return;
      newNode.prev = prevNode;
    }
    if (node === null) {
      // 根节点必须为黑色，其他节点一律先着色为红色
      const color = this.root === null ? COLORS.black : COLORS.red;
      const newNode = new Node(data, color);
      const prevTemp = this.root === null ? null : prev;
      setPrev(prevTemp, newNode);
      return newNode;
    } else if(data < node.data) {
      // 插入node左子树
      node.left = this.insertNode(node.left, data, node);
    } else if(data > node.data) {
      // 插入node右子树
      node.right = this.insertNode(node.right, data, node);
    }

    return node;
  }

  // 处理颜色/旋转
  handleRotation(currentNode, parentNode) {
    if (currentNode === null) return;
    if (parentNode === null) return;
    if (parentNode.prev === null) return;

    if(this.isRed(parentNode) && this.isRed(this.getUncle(currentNode))) {
      // 当前节点的父节点是红色，且当前节点的祖父节点的另一个子节点（叔叔节点）也是红色
      parentNode.color = COLORS.black;
      this.getUncle(currentNode).color = COLORS.black;
      parentNode.prev.color = COLORS.red;
      this.handleRotation(parentNode.prev, parentNode.prev.prev);
    } else if (
      this.isRed(parentNode) && 
      !this.isRed(this.getUncle(currentNode)) &&
      this.getLR(currentNode) === 'rightChild'
    ) {
      // 当前节点的父节点是红色，叔叔节点是黑色，且当前节点是其父节点的右孩子
      this.rotationRR(parentNode);
    } else if (
      this.isRed(parentNode) && 
      !this.isRed(this.getUncle(currentNode)) &&
      this.getLR(currentNode) === 'leftChild'
    ) {
      // 当前节点的父节点是红色，叔叔节点是黑色，且当前节点是其父节点的右孩子
      parentNode.color = COLORS.black;
      parentNode.prev.color = COLORS.red;
      this.rotationLL(parentNode.prev);
    }
  }

  // 获取叔叔节点
  getUncle(node) {
    const uncle = (() => {
      if (this.getLR(node) === 'leftChild') {
        return node.prev.right;
      }

      if (this.getLR(node) === 'rightChild') {
        return node.prev.left;
      }
    })();

    return uncle;
  }

  // 判断节点是其父节点的左孩子还是右孩子
  getLR(node) {
    if (node.prev) {
      if (node.prev.data > node.data) return 'leftChild';
      if (node.prev.data < node.data) return 'rightChild';
    }
    
    return 'root';
  }

  /**
   * 向左单旋转
   * @param {*} node 节点
   * 失衡节点的右节点替代失衡节点
   * 替代节点的左节点子树成为失衡节点的右子树
   * 失衡节点成为替代节点的左子树
   */
  rotationRR(node) {
    const temp = node.right;

    if (temp.left === null) return;

    node.right = temp.left;
    
    if (temp.left) {
      temp.left.prev = node;
    }

    temp.left = node;
    if (node) {
      node.prev = temp;
    }

    temp.color = node.color;
    node.color = COLORS.red;
    return temp;
  }

  /**
   * 向右单旋转
   * @param {*} node 节点
   * 失衡节点的左节点替代失衡节点
   * 替代节点的右节点子树成为失衡节点的左子树
   * 失衡节点成为替代节点的右子树
   */
  rotationLL(node) {
    const temp = node.left;

    if (temp.right === null) return;
    node.left = temp.right;
    
    if (temp.right) {
      temp.right.prev = node;
    }

    temp.right = node;
    if (node) {
      node.prev = temp;
    }

    temp.color = node.color;
    node.color = COLORS.red;
    return temp;
  }

  /**
   * 中序遍历: 从小到大遍历
   * @param {*} callback 对每个节点的处理函数
   */
  inOrderTraverse(callback) {
    this[inOrderTraverseNode](this.root, callback);
  }

  /**
   * 中序遍历辅助函数
   * @param {*} node 节点
   * @param {Function} callback 对每个节点的处理函数
   */
  [inOrderTraverseNode](node, callback) {
    if (node !== null) {
      // 递归遍历左子树
      this[inOrderTraverseNode](node.left, callback);
      // 执行回调操作
      callback(node);
      // 再递归遍历右子树
      this[inOrderTraverseNode](node.right, callback);
    }
  }

  /**
   * 先序遍历: 先访问节点本身，再访问左子树，最后访问右子树
   * @param {Function} callback 对每个节点的处理函数
   */
  preOrderTraverse(callback) {
    this[preOrderTraverseNode](this.root, callback);
  }

  /**
   * 先序遍历辅助函数
   * @param {*} node 节点
   * @param {Function} callback 对每个节点的处理函数
   */
  [preOrderTraverseNode](node, callback) {
    if (node !== null) {
      callback(node);
      this[preOrderTraverseNode](node.left, callback);
      this[preOrderTraverseNode](node.right, callback);
    }
  }

  /**
   * 后续遍历：先访问左右子树，再访问自身节点
   * @param {Function} callback 回调函数
   */
  postOrderTraverse(callback) {
    this[postOrderTraverseNode](this.root, callback);
  }

  /**
   * 后续遍历辅助函数
   * @param {*} node 节点
   * @param {Function} callback 回调函数
   */
  [postOrderTraverseNode](node, callback) {
    if (node !== null) {
      this[postOrderTraverseNode](node.left, callback);
      this[postOrderTraverseNode](node.right, callback);
      callback(node);
    }
  }

  print() {
    return JSON.stringify(this.root, null, 2)
      .replace(/\n/g, '<br>')
      .replace(/\s/g, '&nbsp;&nbsp;');
  }
}