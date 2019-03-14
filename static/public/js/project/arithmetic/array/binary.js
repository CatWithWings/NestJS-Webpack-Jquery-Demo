import Stack from './stack';

export default class Binary {
  constructor(num) {
    this.item = num;
    this.stack = new Stack();
  }

  getString() {
    const base = 2;
    let result = "";

    while (this.item >= 1) {
      this.stack.push(this.item % 2);
      this.item = parseInt(this.item / 2);
    }

    while (this.stack.size() > 0) {
      result += this.stack.peek();
      this.stack.pop();
    }

    return result;
  }

  print() {
    return this.getString();
  }
}