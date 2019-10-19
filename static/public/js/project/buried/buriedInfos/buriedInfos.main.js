// https://segmentfault.com/a/1190000010210739
// https://x-front-team.github.io/2017/03/21/Performance%E7%9F%A5%E5%A4%9A%E5%B0%91/
import '@STYLE_SHEETS/buriedInfos.scss';
import Cookies from 'js-cookie';
import CryptoJS from 'crypto-js';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

class BuriedInfosApp {
  constructor() {
    this.timing = {};
    this.infos = {};
    this.init()
  }
  
  init() {
    // 防止过早获取domComplete等值为0
    setTimeout(() => {
      this.setVId()
        .then(() => {
          this.infos = this.getBuriedInfos();
          this.setNavgiation(
            this.infos.vId, 
            this.infos.pageId, 
            this.infos.navigation
          );
          this.setDomCompletePie(this.infos.timing);
          this.setDomParsePie(this.infos.timing);
          $('#loading').removeClass('loading')
        });
    }, 5000);
    this.bindEvents();
  }
  
  /**
   * 生成VID设备指纹，其实更好的是后端根据硬件信息生成
   * 有效期1天，1天内不重复计算该流量
   */
  setVId() {
    return new Promise((reslove) => {
      if (Cookies.get('VID') === undefined) {
        const secret = 'CAT KEY 123456';
        const now = Date.now();
        const agentinfos = navigator.userAgent;
        const text = `${now}-${agentinfos}`
        const vid = CryptoJS.MD5(text, secret).toString()
        // 当前页有效
        Cookies.set('VID', vid, { expires: 1, path: location.pathname });
        
      }
      reslove(true)
    })
  }
  
  getBuriedInfos() {
    const navigation = this.getNavigation();
    const { timeValue } = this.getTiming();
    const params = {
      vId: Cookies.get('VID'),
      pageId: 10284759, // 每个页面下发固定独立的pageId
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
      }
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
      type: {
        value: origin.type,
        des: typeMap[origin.type]
      },
      redirectCount: `${origin.redirectCount}次`
    }
  }
  
  getTiming() {
    const origin = window.performance.timing;
    const isSSL = origin.secureConnectionStart !== 0;

    this.timing = origin;
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

  formatDuring (ms) {
    const hours = parseInt((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = (ms % (1000 * 60)) / 1000;
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  }
  
  setNavgiation(vId, pageId, navigation) {
    document.getElementById('vid').innerText = vId;
    document.getElementById('resource').innerText = navigation.type.des;
    document.getElementById('redirectCount').innerText = navigation.redirect;
    document.getElementById('page_id').innerText = pageId
  }
  
  // 页面从dns~完全展示
  setDomCompletePie(value) {
    const lengend = [
      'dns解析耗时',
      '建立tcp+ssl耗时',
      '读取缓存资源时间',
      '文档资源请求耗时',
      'dom解析到资源完全加载耗时',
      'domContentLoadedEvent持续时间',
      'loadEvent持续时间'
    ]
    const myChart = echarts.init(document.getElementById('domComplete'));
    // 绘制图表
    myChart.setOption({
      title : {
        text: 
          `从DNS查找~Load事件完成: ${
          this.formatDuring(this.timing.loadEventEnd - this.timing.domainLookupStart)
        }`,
        subtext: `白屏时间: ${this.formatDuring(value.whitePageTime)}`,
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: (data) => {
          return `${data.data.name}: ${this.formatDuring(data.data.value)}`
        }
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:[...lengend]
      },
      series : [
        {
          name:'dns~完全展示',
          type:'pie',
          radius : '60%',
          data:[
            {value: value.dnsTime, name: lengend[0]},
            {value: value.connectTime, name: lengend[1]},
            {value: value.cacheTime, name: lengend[2]},
            {value: value.requestTime, name: lengend[3]},
            {value: value.domLoading, name: lengend[4]},
            {value: value.domContentLoadedEventTime, name: lengend[5]},
            {value: value.loadTime, name: lengend[6]}
          ]
        }
      ]
    });
  }

  // dom解析/资源完全加载各自耗时
  setDomParsePie(value) {
    const lengend = [
      'dom解析耗时',
      '资源完全加载耗时'
    ]
    const myChart = echarts.init(document.getElementById('domParsePie'));
    // 绘制图表
    myChart.setOption({
      title : {
        text: `dom解析/资源完全加载各自耗时`,
        subtext: `总耗时: ${
            this.formatDuring(value.domLoading)
            }`,
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: (data) => {
          return `${data.data.name}: ${this.formatDuring(data.data.value)}`
        }
      },
      legend: {
        x : 'center',
        y : 'bottom',
        data:[...lengend]
      },
      series : [
        {
          type:'pie',
          radius : '60%',
          data:[
            {value: value.domParseTime, name: lengend[0]},
            {value: value.domLoading - value.domParseTime, name: lengend[1]}
          ]
        }
      ]
    });
  }

  bindEvents() {}
}

new BuriedInfosApp()
