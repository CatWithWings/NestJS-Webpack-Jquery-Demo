export default class StarsObserver {
  constructor() {

    // 动作方法至执行队列
    this.message = {};
    this.init();
  }

  init() {
    const regist = this.regist;
    const fire = this.fire;
    const remove = this.remove;

    return { regist, fire, remove }
  }

  /**
   * 注册方法
   * @param {*} type 消息类型
   * @param {*} fn 动作方法
   */
  regist(type, fn) {
    /**
     * 消息类型不存在则创建该类型并推入动作方法至执行队列
     * 如果类型已存在则直接推入动作方法至执行队列
     */
    if (typeof this.message[type] === 'undefined') {
      this.message[type] = [fn];
    } else {
      this.message[type].push(fn)
    }
  }

  /**
   * 发布信息接口
   */
  fire(type, args) {
    if (!this.message[type]) return;

    const events = {
      type, // 消息类型
      args: args || [] // 消息携带数据
    };

    for (let i = 0, len = this.message[type].length; i < len; i++) {
      this.message[type][i].call(this, events);
    }
  }

  /**
   * 移除信息接口
   */
  remove(type, fn) {
    if (this.message[type] !== undefined) {
      let i= this.message[type].length - 1;
      for(; i >= 0; i--) {
        this.message[type][i] === fn && this.message[type].splice(i, 1);
      }
    } 
  }
}