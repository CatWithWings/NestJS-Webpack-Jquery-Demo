import '@STYLE_SHEETS/observers_factory.scss';

import StarsObserver from './stars_factory';

class ObserversFactoryApp {
  constructor() {
    this.starsObserver = new StarsObserver();

    this.beijingCb = (e) => {
      console.log('beijingCb -->', this);
      $('#beijing_area').html(e.args.text);
    };

    this.shanghaiCb = (e) => {
      console.log('shanghaiCb -->', this)
      $('#shanghai_area').html(e.args.text);
    };

    this.guangzhouCb = (e) => {
      console.log('guangzhouCb -->', this)
      $('#guangzhou_area').html(e.args.text);
    };
    this.init();
  }

  init() {
    this.beijing.apply(this);
    this.shanghai.apply(this);
    this.guangzhou.apply(this);
    this.bindEvents.apply(this);
  }

  beijing() {
    this.starsObserver.regist('Beijing', this.beijingCb);
  }

  shanghai() {
    this.starsObserver.regist('Shanghai', this.shanghaiCb);
  }

  guangzhou() {
    this.starsObserver.regist('Guangzhou', this.guangzhouCb);
  }

  bindEvents() {
    $('#beijing').on('click', () => {
      // 只触发type下某一fn
      this.starsObserver.fire('Beijing', {text: '您好，您已经到达北京'}, this.beijingCb)
        .remove('Beijing', this.beijingCb);
    })

    $('#shanghai').on('click', () => {
      // 一次触发type下所有fn
      this.starsObserver.fire('Shanghai', {text: '终于到上海了！'})
        .remove('Shanghai', this.shanghaiCb);
    })

    $('#guangzhou').on('click', () => {
      this.starsObserver.fire('Guangzhou', {text: '这里是广州~'})
        .remove('Guangzhou', this.guangzhouCb);
    })
  }
}

const ObserversFactory = new ObserversFactoryApp();