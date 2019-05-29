/**
 * 分离链表散链表
 */

import LinkList from './linkList';

const hashCode = Symbol("hashCode");
const djb2HashCode = Symbol("djb2HashCode");

export default class ListHashTable {
  constructor() {
    this.table = [];
    this.record = "";
  }

  /**
   * djb2散列函数
   * @param {String} key 
   * 为了减少碰撞，基本使用这个散列函数
   * 但是为了测试解决冲撞，未使用该函数
   */
  [djb2HashCode](key) {
    const hash = 5381; // 一个质数
    const keyArray = [...key];

    keyArray.forEach(item => {
      hash += hash * 33 + item.charCodeAt();
    })

    return hash % 1013;
  }

  /**
   * 散列函数
   * 根据key的每个字符的ASCII码值的和得到一个数字最为数据存放索引
   */
  [hashCode](key) {
    const keyArray = [...key];
    let hash = 0;
    
    keyArray.forEach(item => {
      hash += item.charCodeAt();
    });

    return hash % 37;
  }

  // 新添项
  put(key, value) {
    const index = this[hashCode](key);

    // 该位置没有存放过值
    if (this.table[index] === undefined) {
      this.table[index] = new LinkList();
    }

    this.table[index].append({key, value});
    this.record += `
        散列表：${key} 存放在索引 ${index}位置; 
        该位置的链表为：${this.table[index].print()}
        <br>
      `;
    return this;
  }

  // 移除项
  remove(key) {
    const index = this[hashCode](key);

    if (this.table[index] !== undefined) {
      this.table[index].remove(key)
    }
    return this;
  }

  // 获取项
  get(key) {
    const index = this[hashCode](key);

    if (this.table[index] !== undefined) {
      return this.table[index].get(key);
    }

    return undefined;
  }

  print() {
    return this.record;
  }
}