import { ATM } from './atm_factory';

class ResponseChainFactoryApp {
  constructor() {
    this.init();
  }

  init() {
    this.bindEvents();
  }

  takeMoney(money) {
    const atm = new ATM();
    const result = atm.withDraw(money);
    $('#result').html(result);
  }

  bindEvents() {
    $('#customer_01').on('click', this.takeMoney.bind(this, 8163));
    $('#customer_02').on('click', this.takeMoney.bind(this, 2000));
  }
}

const ResponseChainFactory = new ResponseChainFactoryApp();