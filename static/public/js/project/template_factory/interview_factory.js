class Interview {
  init() {
    return `
      1. ${this.writtenTest()}<br>
      2. ${this.teachInterview()}<br>
      3. ${this.HRInterview()}<br>
      4. ${this.waitResult()}
    `;
  }

  writtenTest() {
    throw new Error('请重写 writtenTest')
  }
  teachInterview() {
    throw new Error('请重写 teachInterview')
  }
  HRInterview() {
    throw new Error('请重写 HRInterview')
  }
  waitResult() {
    return '还没有结果，是不是要凉凉了';
  }
}

class MIInterview extends Interview {
  constructor() {
    super();
  }

  writtenTest() {
    return `看到小米面试题，激动、紧张`
  }

  teachInterview() {
    return `我是小米得技术面试负责人...`
  }

  HRInterview() {
    return '小米的HR小姐姐来面试我了，扑腾扑腾~'
  }
}

export {
  MIInterview
}