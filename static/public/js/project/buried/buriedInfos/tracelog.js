import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import { cloneDeep  } from 'lodash-es';

const _init = Symbol('_init');
const _getVId = Symbol('_getVId');
const _getBuriedInfos = Symbol('_getBuriedInfos');
const _getNavigation = Symbol('_getNavigation');
const _getTiming = Symbol('_getTiming');
const _getMemory = Symbol('_getMemory');
const _sendNewBuried = Symbol('_sendNewBuried');
const _getJSError = Symbol('_getJSError');

export default class TraceLog {
  /**
   * @param {Number} pageId 申请pageId
   * @param {Number | undefined} pickDelay 采集性能信息延迟时间
   */
  constructor(pageId, pickDelay) {
    this.secret = 'CAT KEY 123456';
    this.pageId = pageId || 0;
    
    // 延迟采集时间
    this.pickDelay = pickDelay || 3000;
    
    this.navigation = {};
    this.timing = {};
    this.memory = {};
    
    // 采集的埋点总数据
    this.buriedInfos = {};
  }
  
  /**
   * 暴露给使用者的初始化埋点接口
   * 但此方法是异步的所以调用时必须使用await或者then
   * @returns {Promise<any>}
   */
  initTracelog() {
    return new Promise((reslove) => {
      // 防止过早获取domComplete等值为0
      let timer = setTimeout(async() => {
        timer = null;
        await this[_init]();
        
        // _getBuriedInfos 与 _getBuriedInfos 都会修改该值
        reslove(this.getBuriedInfos());
      }, this.pickDelay)
    })
  }
  
  /**
   * 对外接口 - 返回所有 buriedInfos
   * 读取buriedInfos 应是只读的
   * 且这个方法应当是获取buriedInfos的唯一途径
   */
  getBuriedInfos() {
    const result = cloneDeep(this.buriedInfos);
    return result
  }
  
  /*
   * 更新buriedInfos
   * 每次更新infos都应当调用它而不是直接更改
   * @param {Object} newPerporty 要更新的属性对象
   */
  updateBuriedInfos(newPerporty) {
    const oldValue = cloneDeep(this.buriedInfos);
    this.buriedInfos = {
      ...oldValue,
      ...newPerporty
    };
    
    // 向服务端发送新的埋点信息
    this[_sendNewBuried](this.buriedInfos)
  }
  
  // 模块内部初始化: 调用所有采集方法
  [_init]() {
    return new Promise(res => {
      // 每隔20S重新获取heap 内存信息
      const mometyInterval = 20000;
      const delay = mometyInterval + 500;
      
      this[_getMemory](mometyInterval);
      // 因为获取memory用了异步,所以这里必须等初次memory采集完成才一起返回数据
      setTimeout(async() => {
        await this[_getVId]();
        this[_getNavigation]();
        this[_getTiming]();
        this[_getJSError]();

        this[_getBuriedInfos]();
        res()
      }, delay)
    })
  }

  [_getBuriedInfos]() {
    const navigation = this.navigation;
    const { timeValue, raw } = this.timing;
    const memory = this.memory;
    const pageId = this.pageId;
    
    const params = {
      vId: Cookies.get('VID'),
      pageId, // 每个页面下发固定独立的pageId
      location: {
        origin: location.origin,
        refer: location.href
      },
      navigation: {
        type: navigation.type,
        redirect: navigation.redirectCount
      },
      timing: {
        dnsTime: timeValue.dnsTime, // dns解析耗时
        isSSL: timeValue.isSSL, // 是否是HTTPS
        connectTime: timeValue.connectTime, // 建立tcp+ssl耗时
        cacheTime: timeValue.cacheTime, // 读取缓存资源耗时
        requestTime: timeValue.requestTime, // document请求耗时
        domParseTime: timeValue.domParseTime, // dom解析耗时（不包括资源加载）
        domLoading: timeValue.domLoading, // dom解析到资源完全加载耗时
        whitePageTime: timeValue.whitePageTime, // 白屏时间
        domContentLoadedEventTime: timeValue.domContentLoadedEventTime, // domContentLoadedEvent持续时间
        loadTime: timeValue.loadTime // loadEvent持续时间
      },
      rawTiming: raw,
      memory: {
        jsHeapSizeLimit: memory.jsHeapSizeLimit,
        totalJSHeapSize: memory.totalJSHeapSize,
        usedJSHeapSize: memory.usedJSHeapSize
      }
    };
    
    this.updateBuriedInfos(params);
  }

  /**
   * 生成VID设备指纹，其实更好的是后端根据硬件信息生成
   * 有效期1天，1天内不重复计算该流量
   */
  [_getVId] () {
    return new Promise((reslove) => {
      if (Cookies.get('VID') === undefined) {
        const now = Date.now();
        const agentinfos = navigator.userAgent;
        const text = `${now}-${agentinfos}`;
        const vid = CryptoJS.MD5(text, this.secret).toString();

        // 当前页有效
        Cookies.set('VID', vid, { expires: 1, path: location.pathname });

      }
      reslove(true)
    })
  }

  [_getNavigation]() {
    const origin = window.performance.navigation
    const typeMap = {
      0: '由url, a标签、form 或 JS 跳转进入',
      1: '通过reload进入',
      2: 'Agent 导航栏进入',
      3: '未知进入方式'
    }

    this.navigation = {
      type: {
        value: origin.type,
        des: typeMap[origin.type]
      },
      redirectCount: `${origin.redirectCount}次`
    }
  }

  [_getTiming]() {
    const origin = window.performance.timing;
    const isSSL = origin.secureConnectionStart !== 0;

    this.timing = {
      raw: origin,
      timeValue: {
        dnsTime: origin.domainLookupEnd - origin.domainLookupStart,
        isSSL,
        connectTime: isSSL
          ? origin.connectEnd - origin.secureConnectionStart
          : origin.connectEnd - origin.connectStart,
        cacheTime: origin.requestStart - origin.fetchStart,
        requestTime: origin.responseEnd - origin.requestStart,
        domParseTime: origin.domInteractive - origin.domLoading,
        domLoading: origin.domComplete - origin.domLoading,
        whitePageTime: origin.domInteractive - origin.navigationStart,
        domContentLoadedEventTime: origin.domContentLoadedEventEnd - origin.domContentLoadedEventStart,
        loadTime: origin.loadEventEnd - origin.loadEventStart
      }
    }
  }

  /**
   * 每隔 interval ms 采集依次memory信息
   * @param interval
   */
  [_getMemory](interval) {
    let previous = Date.now();
    
    let loop = () => {
      let now = Date.now();
      let remaining = now - previous;
      
      requestAnimationFrame(loop);
      if (remaining >= interval) {
        previous = now;
        const temp = window.performance.memory;
        this.memory = temp;
        this.updateBuriedInfos({ memory: temp });
      }
    };
    requestAnimationFrame(loop);
  }

  /**
   * 检测 JS Error
   * 由于同源策略，需给所有script标签添加crossorigin属性
   * 问题：如何检测动态添加的script？webpack: output.crossOriginLoading
   * 问题：非动态的如何添加crossOrgin属性？尚未解决
   */
  [_getJSError] () {
    // const scripts = document.getElementsByTagName('script');
    // [...scripts].forEach(item => {
    //   item.setAttribute("crossorigin", "anonymous");
    // });
    window.onerror = (message, source, lineno, colno, error) => {
      console.log('onerror -->', message, source, lineno, colno, error)
    }
  }
  
  [_sendNewBuried] (params) {
    console.log('发送新的埋点信息')
  }
}