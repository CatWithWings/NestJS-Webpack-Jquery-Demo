import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

const _getVId = Symbol('_getVId');
const _getBuriedInfos = Symbol('_getBuriedInfos');
const _getNavigation = Symbol('_getNavigation');
const _getTiming = Symbol('_getTiming');

export default class TraceLog {
  /**
   * @param {Number} pageId 申请pageId
   * @param {Number | undefined} pickDelay 采集性能信息延迟时间
   */
  constructor(pageId, pickDelay) {
    this.secret = 'CAT KEY 123456';
    this.pageId = pageId;
    
    // 延迟采集时间
    this.pickDelay = pickDelay || 3000;
  }
  
  /**
   * 暴露给使用者的初始化埋点接口
   * 但此方法是异步的所以调用时必须使用await或者then
   * @returns {Promise<any>}
   */
  initTracelog() {
    return new Promise((reslove) => {
      // 防止过早获取domComplete等值为0
      let timer = setTimeout(() => {
        timer = null;
        this[_getVId]()
          .then(() => {
            const res = this[_getBuriedInfos]()
            reslove(res)
          })
      }, this.pickDelay)
    })
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

  [_getBuriedInfos]() {
    const navigation = this[_getNavigation]();
    const { timeValue, raw } = this[_getTiming]();
    const pageId = this.pageId;
    
    const params = {
      vId: Cookies.get('VID'),
      pageId, // 每个页面下发固定独立的pageId
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
      raw: raw
    }

    return params;
  }

  [_getNavigation]() {
    const origin = window.performance.navigation
    const typeMap = {
      0: '由url, a标签、form 或 JS 跳转进入',
      1: '通过reload进入',
      2: 'Agent 导航栏进入',
      3: '未知进入方式'
    }

    return {
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

    return {
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
}