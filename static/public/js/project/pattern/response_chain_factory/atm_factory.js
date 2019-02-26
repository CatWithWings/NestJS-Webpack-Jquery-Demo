let _result = '';

class MoneyStack {
  constructor(billSize) {
    this.billSize = billSize;
    this.next = null
  }

  /**
   * 
   * @param {number} amount 提款总额
   */
  withDraw(amount) {
    // 该面值需要几张
    const numBills = Math.floor(amount / this.billSize);
    if (numBills > 0) {
      this.printMoney(numBills);
      amount = amount - this.billSize * numBills;
    }

    amount > 0 && this.next && this.next.withDraw(amount);
  }

  setNextStack(stack) {
    this.next = stack;
  }

  printMoney(numBills) {
    _result += `面值：${this.billSize} - 张数：${numBills}; <br>`;
    // console.log(`BillSize ${this.billSize}: ${numBills}`);
  }
}

// 提供 100 / 50 / 20 / 10 / 5 / 1
class ATM {
  constructor() {
    // 重置结果
    _result = '';

    // 实例化各面值
    // 所有的请求接收者候选人
    const stack100 = new MoneyStack(100);
    const stack50 = new MoneyStack(50);
    const stack20 = new MoneyStack(20);
    const stack10 = new MoneyStack(10);
    const stack5 = new MoneyStack(5);
    const stack1 = new MoneyStack(1);

    // 设置链层次结构，即接收者如何组成链
    stack100.setNextStack(stack50);
    stack50.setNextStack(stack20);
    stack20.setNextStack(stack10);
    stack10.setNextStack(stack5);
    stack5.setNextStack(stack1);

    // 链的最顶层
    this.moneyStacks = stack100;
  }

  withDraw(amount) {
    this.moneyStacks.withDraw(amount);
    return _result;
    
  }
}

export { ATM };
