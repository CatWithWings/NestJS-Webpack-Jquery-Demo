// node辅助类
class Node {
  constructor(ele) {
    this.ele = ele;
    this.next = null;
  }
}

export default class LinkList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  /**
   * 添加元素至链表尾部
   * @param {Object} ele
   * @param {String} ele.key
   * @param {String} ele.value
   */
  append (ele) {
    if (ele.key === undefined || ele.value === undefined) return false;

    let node = new Node(ele);
    let current = null;

    // ele.key已存在
    let isExist = false;

    // 链表为空
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      // key已存在
      if (current.ele.key === ele.key) {
        isExist = true;
      }

      // 链表循环知道最后一项
      while (current.next !== null) {
        // key已存在
        if (current.ele.key === ele.key) {
          isExist = true;
          break;
        } else {
          current = current.next;
        }
      }

      if (!isExist) {
        current.next = node;
      }
    }

    if (!isExist) {
      this.length ++;
    }
    return this;
  }

  /**
   * 从链表中移除一项
   * @param {String} key
   */
  remove(key) {
    let index = this.indexOf(key);
    this.removeAt(index);
    return this;
  }

  // 获取列表中key对应的值
  get(key) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.ele.key === key) {
        return current.ele.value;
      }
      current = current.next;
    }
    return -1;
  }
 
  /**
   * 返回元素在链表中的索引
   * @param {String} key
   */
  indexOf(key) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.ele.key === key) {
        return index;
      }
      current = current.next;
      index++
    }
    return -1;
  }

  // 从链表中移除特定位置的一项
  removeAt(pos) {
    // 判断pos是都超出边界
    if (pos > -1 && pos < this.size()) {
      let current = this.head;
      let index = 0;
      let prev;

      // 移除的是表头
      if (pos === 0) {
        this.head = current.next;
      } else {
        while (index < pos ) {
          prev = current;
          current = current.next;
          index++;
        }

        // 跳过current元素，将prev的next指针指向current的next元素
        prev.next = current.next;
      }
      this.length --;
      return this;
    } else {
      return this;
    }
  }

  // 链表是否为空
  isEmpty() {
    return (this.size() === 0);
  }

  // 链表长度
  size() {
    return this.length;
  }

  // 输出链表的值
  print() {
    let current = this.head;
    let result = "";

    while (current) {
      result += `
        key: ${current.ele.key}, 
        value:  ${current.ele.value} 
        ${current.next === null ? '' : '--> '}
      `;
      current = current.next;
    }
    return result;
  }
}