// https://segmentfault.com/a/1190000010210739
// https://x-front-team.github.io/2017/03/21/Performance%E7%9F%A5%E5%A4%9A%E5%B0%91/
import '@STYLE_SHEETS/buriedInfos.scss';
import echarts from 'echarts/lib/echarts';
import 'echarts/lib/chart/pie';
import 'echarts/lib/chart/funnel';
import 'echarts/lib/component/tooltip';
import 'echarts/lib/component/title';

// 埋点模块
import TraceLog from './tracelog';

class BuriedInfosApp {
  constructor() {
    this.infos = {};
    this.init()
  }
  
  async init() {
    const traceLog = new TraceLog(10284759);
    this.infos = await traceLog.initTracelog();

    // 这些方法都是客户端拿到数据this.infos后，传回给分析组
    // 分析组根据数据做的操作，只是这里写在了一起
    this.setNavgiation(
      this.infos.vId, 
      this.infos.pageId, 
      this.infos.navigation
    );
    this.setDomCompletePie(this.infos.timing, this.infos.rawTiming);
    this.setDomParsePie(this.infos.timing);
    this.setMomeryChart(this.infos.momery);
    $('#loading').removeClass('loading');
    this.bindEvents();
  }

  formatDuring (ms) {
    const hours = parseInt((ms % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = parseInt((ms % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = (ms % (1000 * 60)) / 1000;
    return hours + " 小时 " + minutes + " 分钟 " + seconds + " 秒 ";
  }

  formatBytesToSize (bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B','KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return (bytes / Math.pow(k, i)) + ' ' + sizes[i];                                                                                                              //return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
  }
  
  // 页面navgiation信息
  setNavgiation(vId, pageId, navigation) {
    document.getElementById('vid').innerText = vId;
    document.getElementById('resource').innerText = navigation.type.des;
    document.getElementById('redirectCount').innerText = navigation.redirect;
    document.getElementById('page_id').innerText = pageId
  }
  
  // 页面从dns~完全展示
  setDomCompletePie(value, rawTiming) {
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
          this.formatDuring(rawTiming.loadEventEnd - rawTiming.domainLookupStart)
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
    ];
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

  // JS heap 分配及占用情况
  setMomeryChart(value) {
    const lengend = [
      '其他',
      'JS 已分配但未使用内存',
      'JS 活动段已用内存'
    ];
    const myChart = echarts.init(document.getElementById('momery'));

    myChart.setOption({
      title : {
        text: `JS Heap 分配及占用`,
        subtext: `可分配堆内存上限: ${
          this.formatBytesToSize(value.jsHeapSizeLimit)
          }`,
        x:'center'
      },
      tooltip : {
        trigger: 'item',
        formatter: (data) => {
          const btys = this.formatBytesToSize(data.data.value)
          return `${data.data.name}: ${btys}`
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
            { value: value.usedJSHeapSize, name: lengend[2] },
            { value: value.totalJSHeapSize  - value.usedJSHeapSize, name: lengend[1] },
            { 
              value: value.jsHeapSizeLimit - value.totalJSHeapSize, 
              name: lengend[0] 
            }
          ]
        }
      ]
    });
  }

  bindEvents() {}
}

new BuriedInfosApp();
