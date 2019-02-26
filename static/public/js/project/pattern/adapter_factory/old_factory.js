// 假设A是原来写的库，以后需要用jQuery重写适配
let A = {};

A.g = function(id) {
  return document.getElementById(id);
}

// 为元素绑定事件
A.on = function(id, type, fn) {
  const dom = typeof id === 'string' ? this.g(id) : id;

  if (dom.addEventListener) {
    dom.addEventListener(type, fn, false);
  } else if (dom.attachEvent) {
    dom.attachEvent('on' + type, fn);
  } else {
    dom['on' + type] = fn;
  }
}

export {
  A
};