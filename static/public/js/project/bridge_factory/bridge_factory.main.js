import Ball from './es6_factory/ball_factory';
import Human from './es6_factory/human_factory';

class BridgeFactoryApp {
  constructor() {
    this.ball = new Ball({x: 5, y: 6, color: '蓝白相间'});
    this.human = new Human({x: 7, y: 13, content: 'Hi'});
  }

  init() {
    this.bindEvents();
  }

  bindEvents() {
    $('#human').on('click', () => {
      alert(this.human.init());
    })

    $('#ball').on('click', () => {
      alert(this.ball.init());
    })
  }
}

const BridgeFactory = new BridgeFactoryApp()
BridgeFactory.init();