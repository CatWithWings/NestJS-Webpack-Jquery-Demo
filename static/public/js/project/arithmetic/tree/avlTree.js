/**
 * 平衡二叉树
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
    this.root = this.insertNode(this.root, data);
    return this;
  }

  // 插入节点辅助函数
  insertNode(node, data) {
    if (node === null) {
      node = new Node(data, null, null);
    } else if (data < node.data) {
      // 插入node左子树
      node.left = this.insertNode(node.left, data);
      if (node.left !== null) {
        // 确认是否需要平衡
        if (this.setBF(node) > 1 || this.setBF(node) < -1) {
          if (data < node.left.data) {
            node = this.rotationLL(node);
          } else {
            node = this.rotationLR(node);
          }
        }
      }
    } else if (data > node.data) {
      // 插入node右子树
      node.right = this.insertNode(node.right, data);
      if(node.right !== null) {
        // 确认是否需要平衡
        if(this.setBF(node) > 1 || this.setBF(node) < -1) {
          // 旋转
          if (data > node.right.data) {
            node = this.rotationRR(node);
          } else {
            node = this.rotationRL(node);
          }
        }
      }
    }
    return node;
  }

  /**
   * 计算某节点的平衡因子：平衡因子 = 右子树的高度 - 左子树的高度
   * @param {*} node 节点
   * @returns {Number} 该节点平衡因子(若是平衡二叉树，因子应是-1, 0, 1中之一)
   * 0 代表左子树高等于右子树高
   * 1 代表右子树比左子树高
   * -1 代表左子树比右子树高
   */
  setBF(node) {
    if (node === null) return;
    const bf = this.heightNode(node.right) - this.heightNode(node.left);
    return bf;
  }

  /**
   * 计算子树某节点的高度
   * @param {*} node 节点
   * @returns {Number} 节点深度
   */
  heightNode(node) {
    let lLen = 0; // 节点左子树深度
    let rLen = 0; // 节点右子树深度

    if (node === null) {
      return 0;
    } else if(node.left===null && node.right === null){
      // 证明已经到达叶子节点，高度返回1，是递归的停止条件
      return 1;
    } else {
      if (node.left !== null) {
        // 左子树不为空，则左子树继续计算深度
        lLen = this.heightNode(node.left);
      }

      if(node.right !== null) {
        // 右子树不为空，则右子树继续计算深度
        rLen = this.heightNode(node.right);
      }

      // 子树层次 + 1
      return lLen > rLen ? lLen + 1 : rLen + 1
    }
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
    node.right = temp.left;
    temp.left = node;
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
    node.left = temp.right;
    temp.right = node;
    return temp;
  }

  /**
   * 向右双旋转
   * @param {*} node 节点
   * 失衡节点的左节点使用了先使用了向左单旋转，然后失衡节点再使用向右单旋转
   */
  rotationLR(node) {
    node.left = this.rotationRR(node.left);
    return this.rotationLL(node);
  }

  /**
   * 向左双旋转
   * @param {*} node 节点
   * 失衡节点的右节点使用了先使用了向右单旋转，然后失衡节点再使用向左单旋转
   */
  rotationRL(node) {
    node.right = this.rotationLL(node.right);
    return this.rotationRR(node);
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