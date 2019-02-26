import OrginFactory from './orgin_factory';
import StrongFactory from './strong_factory';

class DecoratorFactoryApp {
  init() {
    this.bindEvents()
  }

  bindEvents() {
    $('#old').on('click', () => OrginFactory.init());

    $('#stronger').on('click', () => StrongFactory.init());
  }
}

const DecoratorFactory = new DecoratorFactoryApp();
DecoratorFactory.init();