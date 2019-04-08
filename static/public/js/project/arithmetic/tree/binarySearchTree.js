/**
 * 查询二叉树
 */

class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

const inOrderTraverseNode = Symbol('inOrderTraverseNode');
const preOrderTraverseNode = Symbol('preOrderTraverseNode');
const postOrderTraverseNode = Symbol('postOrderTraverseNode');
const maxNode = Symbol('maxNode');
const minNode = Symbol('minNode');

export default class BinarySearchTree {
  constructor() {
    this.root = null
  }

  // 插入节点
  insert(data) {
    const node = new Node(data, null, null);

    if (this.root === null) {
      this.root = node;
    } else {
      let current = this.root;
      while(true) {
        if (current.data > data) {
          // 插入左子树
          if (current.left === null) {
            current.left = node;
            break;
          }
          current = current.left;
        } else {
          // 插入右子树
          if (current.right === null) {
            current.right = node;
            break;
          }
          current = current.right;
        }
      }
    }
    return this;
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
      callback(node.data);
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
      callback(node.data);
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
      callback(node.data);
    }
  }

  // 最小值
  min() {
    return this[minNode](this.root) ? this[minNode](this.root).data : null;
  }

  [minNode](node) {
    if (node !== null) {
      let current = node;
      while (current && current.left) {
        current = current.left;
      }
      return current;
    }
    return null;
  }

  // 最大值
  max() {
    return this[maxNode](this.root) ? this[maxNode](this.root).data : null;
  }

  [maxNode](node) {
    if (node !== null) {
      let current = node;
      while(current && current.right) {
        current = current.right;
      }
      return current;
    }
    return null;
  }

  // 根据值删除某个节点
  remove(data) {
    this.root = this.removeNode(this.root, data);
  }

  removeNode(node, data) {
    if (node === null) return null;

    if (node.data === data) {
      // 仅有一个节点
      if (node.left === null && node.right === null) return null;

      // 仅有右子树，则root指向右子树
      if (node.left === null) return node.right;

      // 仅有左子树，则root指向左子树
      if (node.right === null) return node.left;

      // 既有左子树又有右子树
      // 则从他的右子树中找到最小的节点代替它的位置，并删除那个最小的节点
      const min = this[minNode](node.right);
      const minNodeData = min.data;
      node.right = this.removeNode(node.right, minNodeData);
      node.data = minNodeData;
      return node;
    } else if(node.data > data) {
      node.left = this.removeNode(node.left, data);
      return node;
    } else {
      node.right = this.removeNode(node.right, data);
      return node;
    }
  }

  print() {
    return JSON.stringify(this.root, null, 2)
      .replace(/\n/g, '<br>')
      .replace(/\s/g, '&nbsp;&nbsp;');
  }
}