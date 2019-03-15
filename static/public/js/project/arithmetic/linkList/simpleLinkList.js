// node辅助类
class Node {
  constructor(ele) {
    this.ele = ele;
    this.next = null;
  }
}

export default class SimpleLinkList {
  constructor() {
    this.length = 0;
    this.head = null;
  }

  // 添加元素至链表尾部
  append (ele) {
    let node = new Node(ele);
    let current = null;

    // 链表为空
    if (this.head === null) {
      this.head = node;
    } else {
      current = this.head;

      // 链表循环知道最后一项
      while (current.next !== null) {
        current = current.next;
      }
      current.next = node;
    }
    this.length ++;

    return this;
  }

  // 向特定位置插入元素
  insert (pos, ele) {
    let node = new Node(ele);
    let current = this.head;
    let prev;
    let index = 0;

    // 检查边界
    if (pos > -1 && pos < this.size()) {
      // 插入队首
      if (pos === 0) {
        this.head = node;
        node.next = current;
      } else {
        while (index < pos) {
          prev = current;
          current = current.next;
          index++;
        }
        prev.next = node;
        node.next = current;
      }

      this.length ++;
      return this;
    } else {
      return this;
    }
  }

  // 从链表中移除一项
  remove(ele) {
    let index = this.indexOf(ele);
    this.removeAt(index);
    return this;
  }

  // 返回元素在链表中的索引
  indexOf(ele) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.ele === ele) {
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
      result += `${current.ele} ${current.next === null ? '' : '--> '}`;
      current = current.next;
    }
    return result;
  }
}