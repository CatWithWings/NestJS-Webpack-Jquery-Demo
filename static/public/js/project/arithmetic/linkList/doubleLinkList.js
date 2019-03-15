class Node {
  constructor(ele) {
    this.ele = ele;
    this.prev = null;
    this.next = null;
  }
}

export default class DoubleLikList {
  constructor() {
    this.length = 0;
    this.head = null;
    this.tail = null;
  }

  // 添加元素至链表尾部
  append (ele) {
    let node = new Node(ele);
    let current = null;

    if (this.head === null && this.tail === null) {
      this.head = node;
      this.tail = node;
    } else {
      current = this.head;
      while(current.next !== null) {
        current = current.next;
      }
      this.tail = node;
      current.next = node;
      node.prev = current;
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

    // 检查是都越界
    if (pos > -1 && pos <= this.size()) {
      // 插入队首
      if (pos === 0) {
        if (!this.head) {
          this.head = node;
          this.tail = node;
        } else {
          node.next = current;
          current.prev = node;
          this.head = node;
        }
      } else if (pos === this.size() && this.size() !== 0) {
        // 插入队尾
        current = this.tail;
        node.prev = current;
        current.next = node;
        this.tail = node;
      } else {
        while (index < pos) {
          prev = current;
          current = current.next;
          index ++;
        }
        node.prev = prev;
        node.next = current;
        current.prev = node;
        prev.next = node;
      }
      this.length ++;
      return this;
    } else {
      return this;
    }
  }

  remove(ele) {
    let index = this.indexOf(ele);
    this.removeAt(index);
    return this;
  }

  removeAt(pos) {
    if (pos > -1 && pos < this.size() && this.size() !== 0) {
      let current = this.head;
      let prev;
      let index = 0;

      if (pos === 0) {
        this.head = current.next;
        this.head.prev = null;
      } else if (pos === (this.size()-1)) {
        current = this.tail;
        this.tail = current.prev;
        this.tail.next = null;
      } else {
        while (index < pos) {
          prev = current;
          current = current.next;
          index ++;
        }
        prev.next = current.next;
        current.next.prev = prev;
      }
      return this;
    } else {
      return this;
    }
  }
  
  indexOf(ele) {
    let current = this.head;
    let index = 0;

    while (current) {
      if (current.ele === ele) {
        return index
      }
      current = current.next;
      index++;
    }

    return -1;
  }

  isEmpty() {
    return (this.size() === 0);
  }

  size () {
    return this.length;
  }

  print() {
    let current = this.head;
    let result = "";

    while (current) {
      result += `${current.ele}${current.next === null ? "" : " ⇄ "}`;
      current = current.next;
    }

    return result;
  }
}