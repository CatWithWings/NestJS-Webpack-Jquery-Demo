class Speak {
  constructor(content) {
    this.content = content;
  }

  say() {
    return this.content;
  }
}

class Speed {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  run() {
    return `x轴方向运动了${this.x}, y轴方向运动了${this.y}`;
  }
}

class Color {
  constructor(color) {
    this.color = color;
  }

  draw() {
    return `我被涂成${this.color}`;
  }
}

export {
  Speak,
  Speed,
  Color
}
