import { Speed, Color } from './tool_factory';

export default class Ball {
  constructor({x, y, color}) {
    this.speed = new Speed(x, y);
    this.color = new Color(color);
  }

  init() {
    return `
      我是足球\n
      ${this.speed.run()}\n
      ${this.color.draw()}
    `
  }
}