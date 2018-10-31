import '@STYLE_SHEETS/observers_factory.scss';

import StarsObserver from './stars_factory';

class ObserversFactoryApp {
  constructor() {
    this.starsObserver = new StarsObserver();
    this.init();
  }

  init() {
    this.beijing.apply(this);
    this.shanghai.apply(this);
    this.guangzhou.apply(this);
    this.bindEvents();
  }

  callbacks() {
    return {
      beijingCb: (e) => {
        $('#beijing_area').html(e.args.text);
      },

      shanghaiCb: (e) => {
        $('#shanghai_area').html(e.args.text);
      },

      guangzhouCb: (e) => {
        $('#guangzhou_area').html(e.args.text);
      }
    }
  }

  beijing() {
    this.starsObserver.regist('Beijing', this.callbacks().beijingCb);
  }

  shanghai() {
    this.starsObserver.regist('Shanghai', this.callbacks().shanghaiCb);
  }

  guangzhou() {
    this.starsObserver.regist('Guangzhou', this.callbacks().guangzhouCb);
  }

  bindEvents() {
    $('#beijing').on('click', () => {
      this.starsObserver.fire('Beijing', {text: '你好，你已经到达北京'});
    })

    $('#shanghai').on('click', () => {
      this.starsObserver.fire('Shanghai', {text: '终于到上海了！'});
    })

    $('#guangzhou').on('click', () => {
      this.starsObserver.fire('Guangzhou', {text: '这里是广州~'});
    })
  }
}

const ObserversFactory = new ObserversFactoryApp();