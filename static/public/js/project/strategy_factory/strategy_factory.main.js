import { DiscountFactory } from './discount_factory';

class StrategyFactoryApp {
  constructor(){
    this.orgainPrice = 1233;
    this.discountFactory = new DiscountFactory();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#three').on('click', () => {
      alert(`Price：${this.discountFactory.exec('discount30', this.orgainPrice)}`);
    })

    $('#five').on('click', () => {
      alert(`Price：${this.discountFactory.exec('discount50', this.orgainPrice)}`);
    })

    $('#seven').on('click', () => {
      alert(`Price：${this.discountFactory.exec('discount70', this.orgainPrice)}`);
    })
  }
}

const StrongFactory = new StrategyFactoryApp();
