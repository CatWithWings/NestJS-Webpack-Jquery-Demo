import Stack from "./stack";
import Binary from './binary';

class ArrayApp {
  constructor() {
    this.stack = new Stack(5);
    this.init.apply(this);
  }

  init() {
    this.getBinary();
    this.bindEvent.apply(this);  
  }

  // 十进制转二进制
  getBinary() {
    const binary = new Binary(173);
    const result = binary.print();
    $("#binary").empty().append(result);
  }

  // 斐波那契尾递归法
  fibonacci(n, num1, num2) {
    if (num1 === undefined) num1 = 1;
    if (num2 == undefined) num2 = 1;

    if (n <= 0) {
      return 0;
    } else if (n === 1) {
      return num1;
    }
    return this.fibonacci(n - 1, num2, num1 + num2);
  }

  getFibonacci() {
    const value = $("#num").val();
    if (value !== undefined) {
      let result = this.fibonacci.apply(this, [Number(value)]);
      $("#result").empty().append(result);
    }
  }

  pushStack() {
    const value = $("#stack").val();
    if (value !== undefined) {
      this.stack.push(value);
      this.getStack();
    }
  }

  popStack() {
    this.stack.pop();
    this.getStack();
  }

  getStackPeek() {
    alert(this.stack.peek());
  }

  getStack() {
    $("#stackResult").empty().append(`[${this.stack.print().join(', ')}]`);
  }

  bindEvent() {
    $("#submit").on('click', () => this.getFibonacci());

    $("#pushStack").on('click', () => this.pushStack());

    $("#popStack").on('click', () => this.popStack());

    $("#getPeek").on('click', () => this.getStackPeek());
  }
}

new ArrayApp();