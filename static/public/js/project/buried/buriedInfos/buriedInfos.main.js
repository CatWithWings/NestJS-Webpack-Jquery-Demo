// https://segmentfault.com/a/1190000010210739
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';

class BuriedInfosApp {
  constructor() {
    this.init()
  }
  
  init() {
    this.setVId();
    this.bindEvents();
  }
  
  /**
   * 生成VID设备指纹，其实更好的是后端根据硬件信息生成
   * 有效期1天，1天内不重复计算该流量
   */
  setVId() {
    if (Cookies.get('VID') === undefined) {
      const secret = 'CAT KEY 123456';
      const now = Date.now();
      const agentinfos = navigator.userAgent;
      const text = `${now}-${agentinfos}`
      const vid = CryptoJS.AES.encrypt(text, secret).toString()
      
      // 当前页有效
      Cookies.set('VID', vid, { expires: 1, path: location.pathname });
    }
  }
  
  getBuriedInfos() {
    const navigation = this.getNavigation();
    const params = {
      vId: Cookies.get('VID'),
      pageId: 10284759, // 每个页面下发固定独立的pageId
      navigation: {
        type: navigation.type,
        redirect: navigation.redirectCount
      },
      timing: {}
    }
    
    return params;
  }
  
  getNavigation() {
    const origin = window.performance.navigation
    const typeMap = {
      0: '由url, a标签、form 或 JS 跳转进入',
      1: '通过reload进入',
      2: 'Agent 导航栏进入',
      3: '未知进入方式'
    }
    
    return {
      type: typeMap[origin.type],
      redirectCount: `${origin.redirectCount}次`
    }
  }

  bindEvents() {}
}

new BuriedInfosApp()
