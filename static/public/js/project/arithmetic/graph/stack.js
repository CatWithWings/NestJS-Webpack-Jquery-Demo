export default class Stack {
  constructor(len, defaultValue) {
    this.maxSize = len === undefined ? 'INFINITI' : len;
    this.item = new Array();

    if (defaultValue !== undefined) {
      this.push(defaultValue);
    }
  }

  // 推入栈顶
  push(ele) {
    if (this.size() < this.maxSize || this.maxSize === 'INFINITI') {
      this.item.push(ele);
    } else {
      alert("栈顶元素已满，入栈失败");
    }
  }

  // 推出栈顶
  pop() {
    if (!this.isEmpty()) {
      this.item.pop();
    } else {
      alert("栈已为空");
    }
  }

  // 返回栈顶元素
  peek() {
    return this.item[this.size() - 1];
  }

  // 判断栈是否为空
  isEmpty() {
    return this.item.size === 0;
  }

  // 返回栈中的元素个数
  size() {
    return this.item.length;
  }

  print() {
    return this.item;
  }

  // 清空栈
  clear() {
    this.item.splice(0, this.size());
  }
}