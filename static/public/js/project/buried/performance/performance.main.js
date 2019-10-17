import moment from 'moment';

class PerformanceApp {
  constructor(){
    this.dateFormat = 'YYYY-MM-DD HH:mm:ss';
  }

  init(){
    this.bindEvents();
  }

  getNavigation() {
    /**
     * 
     * @type {PerformanceNavigation}
     * @property {Number} redirectCount 重定向次数
     * @property {Number} type 页面操作类型
     * PerformanceNavigation.type: 
     * 0 - 页面通过链接、书签、表单提交、JS操作、URL地址栏的修改而进入的
     * 1 - 页面通过浏览器reload按钮、JS reload方法进入
     * 2 - 通过导航的history进入
     * 255 - 任何不属于上述方法的进入方式
     */
    const infos = window.performance.navigation;
    console.log('页面操作相关信息 -->', infos)
  }

  getTimeing() {
    const info = window.performance.timing;
    const res = {
      navigationStart: `同浏览器上一个文档卸载结束时的时间 -> ${moment(info.navigationStart).format(this.dateFormat)}`,
      unloadEventStart: `同浏览器上一个文档卸载事件开始前的时间 -> ${moment(info.unloadEventStart).format(this.dateFormat)}`,
      unloadEventEnd: `同浏览器上一个文档卸载事件完成后的时间 -> ${moment(info.unloadEventEnd).format(this.dateFormat)}`,
      redirectStart: `第一个同源重定向开始前的事件 -> ${moment(info.redirectStart).format(this.dateFormat)}`,
      redirectEnd: `最后一个同源重定向完成前的事件 -> ${moment(info.redirectEnd).format(this.dateFormat)}`,
      fetchStart: `用户通过GET获取资源前的时间(检查缓存前) -> ${moment(info.fetchStart).format(this.dateFormat)}`,
      domainLookupStart: 
        `查找域名开始之前的时间 -> ${moment(info.domainLookupStart).format(this.dateFormat)}`,
      domainLookupEnd: `查找域名结束时的时间 -> ${moment(info.domainLookupEnd ).format(this.dateFormat)}`,
      connectStart: `与服务器建立连接之前的时间  -> ${moment(info.connectStart).format(this.dateFormat)}`,
      connectEnd: `与服务器建立连接完成的时间 -> ${moment(info.connectEnd).format(this.dateFormat)}`,
      secureConnectionStart: 
        `https的ssl握手开始之前的时间 -> ${moment(info.secureConnectionStart).format(this.dateFormat)}`,
      requestStart: `用户向服务端开始请求前的时间 -> ${moment(info.requestStart).format(this.dateFormat)}`,
      responseEnd: `用户向服务端完成请求时的时间 -> ${moment(info.responseEnd).format(this.dateFormat)}`,
      domLoading: `当前网页DOM结构开始解析时的时间 -> ${moment(info.domLoading).format(this.dateFormat)}`,
      domInteractive: `当前网页DOM结构结束解析、开始加载内嵌资源时的时间 -> ${moment(info.domInteractive).format(this.dateFormat)}`,
      domContentLoadedEventStart: 
        `解析器发送DOMContentLoaded 事件的时间 -> ${moment(info.domContentLoadedEventStart).format(this.dateFormat)}`,
      domContentLoadedEventEnd:
        `需要立即执行的脚本已经被执行时的时间 -> ${moment(info.domContentLoadedEventEnd).format(this.dateFormat)}`,
      domComplete:
        `当前文档解析完成的时间 -> ${moment(info.domComplete).format(this.dateFormat)}`,
      loadEventStart:
        `load事件被发送时的时间 -> ${moment(info.loadEventStart).format(this.dateFormat)}`,
      loadEventEnd:
        `load事件结束时的时间 -> ${moment(info.loadEventEnd).format(this.dateFormat)}`,
    }
    console.log('页面性能信息 -->', res)
  }
  
  _bytesToSize (bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)) + ' ' + sizes[i];                                                                                                              //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }
  
  getTMemory() {
    const info = window.performance.memory
    console.log('JS 内存信息 -->', {
      jsHeapSizeLimit: `可分配内存上限 -> ${this._bytesToSize(info.jsHeapSizeLimit)}`,
      totalJSHeapSize: `JS 分配总内存 -> ${this._bytesToSize(info.totalJSHeapSize)}`,
      usedJSHeapSize: `JS 已用内存 -> ${this._bytesToSize(info.usedJSHeapSize)}`
    })
  }

  bindEvents(){
    $('#navigation').on('click', () => this.getNavigation());
    $('#timeing').on('click', () => this.getTimeing());
    $('#memory').on('click', () => this.getTMemory());
  }
}

const PerformanceExercise = new PerformanceApp();
PerformanceExercise.init();