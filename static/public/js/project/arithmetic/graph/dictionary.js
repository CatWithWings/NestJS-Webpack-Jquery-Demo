export default class Dictionary {
  constructor() {
    this.items = {};
  }

  /**
   * 设置新元素
   * @param {*} key 
   * @param {*} value 
   */
  set(key, value) {
    this.items[key] = value;

    return this;
  }

  delete(key) {
    if (this.has(key)) {
      delete this.items[key];
    }

    return this;
  }

  // 某个键是否存在于字典中
  has(key) {
    return key in this.items;
  }

  // 查找key的值
  get(key) {
    return this.items[key];
  }

  clear() {
    this.items = {};
  }

  size() {
    return Object.keys(this.items).length;
  }

  keys() {
    return Object.keys(this.items);
  }

  values() {
    return Object.keys(this.items).map(key => {
      return this.items[key];
    });
  }
}