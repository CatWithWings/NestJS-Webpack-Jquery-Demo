export default class SimpleQueue {
  constructor() {
    this.items = [];
  }

  // 向队尾添加一个或多个新项
  enqueue(...eles) {
    const data = eles;

    data.forEach(item => {
      if (!this.items.includes(item)) {
        this.items.push(item);
      }
    })
    return this;
  }

  // 移除队首的项
  dequeue() {
    this.items.splice(0, 1);
    return this;
  }

  // 获取队首元素
  fornt() {
    return this.items[0];
  }

  // 判断队列是否为空
  isEmpty() {
    return (this.items.length === 0);
  }

  empty() {
    this.items.splice(0, this.size());
    return this;
  }

  // 获取队列长度
  size() {
    return this.items.length;
  }

  print() {
    return this.items.join(', ');
  }
}