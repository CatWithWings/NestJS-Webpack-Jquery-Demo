import { Speed, Speak } from './tool_factory';

export default class Human {
  constructor({x, y, content}) {
    this.speed = new Speed(x, y);
    this.speak = new Speak(content);
  }

  init() {
    return `
      我是人\n
      ${this.speak.say()}\n
      ${this.speed.run()}
    `
  }
}