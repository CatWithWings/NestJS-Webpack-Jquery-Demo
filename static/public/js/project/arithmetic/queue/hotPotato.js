import SimpleQueue from './simpleQueue';

export default class HotPotato {
  /**
   * 
   * @param {Array} nameList 名单
   * @param {Number} num 最终报数
   */
  constructor(nameList, num) {
    this.queue = new SimpleQueue();
    this.nameList = nameList;
    this.num = num;
    this.result = "";

    this.init();
  }

  init() {
    this.queue.enqueue(...this.nameList);
  }

  start() {
    let lower = "";
    let winner = "";

    while (this.queue.size() > 1) {
      // 计数未结束前传递到指针的人都移动到队尾
      for (let i=0; i<this.num; i++) {
        const temp = this.queue.fornt();
        this.queue.dequeue().enqueue([temp]);
      }

      // 计数停止，拿到指针的人T出队列
      lower = this.queue.fornt();
      this.queue.dequeue();
      this.result += `${lower} 在本轮中被淘汰;<br>`
    }

    winner = this.queue.print();
    this.result += `${winner} 是最后的赢家;`;
    return this.result;
  }
}