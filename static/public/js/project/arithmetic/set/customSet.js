export default class CustomSet {
  constructor() {
    this.items = {};
  }

  // 添加新项
  add(val) {
    if (!this.items[val]) {
      this.items[val] = val;
    }
    return this;
  }

  // 删除一项
  delete(val) {
    if (this.has(val)) {
      delete this.items[val];
    }
    return this;
  }

  // 判断值是否在集合中
  has(val) {
    return this.items.hasOwnProperty(val);
  }

  // 移除集合中所有元素
  clear() {
    this.items = {};
    return this;
  }

  // 集合长度
  size() {
    return Object.keys(this.items).length;
  }

  // 获取set以数组方式返回
  values() {
    return Object.keys(this.items);
  }

  getJson() {
    return this.items;
  }

  // 返回集合数据
  print() {
    return this.formatObject(this.items);
  }

  formatObject(obj) {
    return `{ ${Object.keys(obj).join(', ')} }`;
  }
}