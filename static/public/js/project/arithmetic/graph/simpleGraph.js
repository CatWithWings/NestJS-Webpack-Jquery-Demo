/**
 * 邻接表法 - 图
 * http://www.liuyiqi.cn/2017/02/19/graph/
 */
import Dictionary from './dictionary';
import SimpleQueue from './simpleQueue';

export default class SimpleGraph {
  constructor() {
    // 顶点
    this.vertices = [];

    // 存放邻接点
    this.adjList = new Dictionary();

    // 发现/探索完成时间 (time只可能是顶点数量的1~2倍之间)
    this.time = 0;
  }

  // 添加顶点
  addVertex(v) {
    this.vertices.push(v);
    this.adjList.set(v, []);
    return this;
  }

  /**
   * 添加从顶点 v 道 w 的边
   * @param {*} v 源顶点
   * @param {*} w 目标顶点
   */
  addEdge(v, w) {
    this.adjList.get(v).push(w);
    this.adjList.get(w).push(v);
    
    return this;
  }

  // 初始化顶点颜色 --> 白色：未被访问过
  initializeColor() {
    let color = {};
    this.vertices.forEach((item, index) => {
      color[item] = 'white';
    });
    return color;
  }

  /**
   * 广度优先算法
   * @param {String} v 顶点key
   * @param {Funtion} callback 回调函数
   * 从指定的第一个顶点开始遍历图
   * 先访问其所有相邻点
   */
  bts(v, callback) {
    let color = this.initializeColor(),
      queue = new SimpleQueue(),
      d = {}, // 记录从v到各个顶点u的距离
      pred = {}; // 记录每个顶点u的前溯点

    // 初始化d 与 pred
    this.vertices.forEach(item => {
      d[item] = 0;
      pred[item] = null;
    });
    
    // 入队
    queue.enqueue(v);

    // 标记已入过队
    color[v] = 'black';

    // 直至列表为空时，则遍历了所有顶点(连通图)
    while(!queue.isEmpty()) {
      // 顶点出队列
      let u = queue.dequeue()[0];

      // 获取相邻点
      const neighbors = this.adjList.get(u);

      // 将顶点的所有未入过队列的相邻点入队列
      neighbors.forEach(item => {
        if (color[item] === 'white') {
          d[item] = d[u] + 1; // 前溯点u到邻点item的距离 + v到u的已有距离
          pred[item] = u; // 邻点item的前溯点u
          queue.enqueue(item);
          color[item] = 'black'
        }
      });

      if(callback) {
        callback(u);
      }
    }

    // v到每个顶点的最短路径
    const paths = this.shortPathBst(v, pred);
    return {
      distances: d,
      predecessors: pred,
      paths
    };
  }

  /**
   * 使用广度优先查找到每个顶点的最短路径
   * @param {String} v 顶点key
   * @param {Object} pred 记录每个顶点u的前溯点
   */
  shortPathBst(v, pred) {
    const vertex = this.vertices.filter(item => item !== v);
    const result = [];

    vertex.forEach(item => {
      let predNode = pred[item];
      let temp = [];
      temp.push(item);

      while(predNode !== v) {
        temp.push(predNode);
        predNode = pred[predNode];
      }
      temp.push(v);
      temp.reverse();
      result.push(temp.join('-'));
    });

    return result;
  }

  /**
   * 
   * @param {String} v 顶点key
   * @param {Funtion} callback 回调函数
   * 先访问一个顶点，然后对相邻顶点挨个进行深度优先遍历
   */
  dfs(v, callback) {
    const color = this.initializeColor();
    const findTime = {}; // 顶点被发现时间
    const finishTime = {}; // 顶点完成探索时间
    const pred = {}; // 记录每个顶点的前溯点

    // 初始化
    this.vertices.forEach(item => {
      findTime[item] = 0;
      finishTime[item] = 0;
      pred[item] = null;
    });

    this.dfsVisit(v, color, callback, findTime, finishTime, pred);


    /**
     * 得到finishTime，按照由大到小排列，就可以得到一个有向无环图的拓扑排序
     */
    return { findTime, finishTime, predecessors: pred }
  }

  dfsVisit(v, color, callback, findTime, finishTime, pred) {
    color[v] = 'grey'; // 被发现
    findTime[v] = ++this.time;

    if(callback) {
      callback(v);
    }
    const neighbors = this.adjList.get(v);

    neighbors.forEach(item => {
      if(color[item] === 'white') {
        pred[item] = v;
        this.dfsVisit(item, color, callback, findTime, finishTime, pred);
      }
    });

    /**
     * 探索完成
     * 探索完成是指该顶点的所有相邻顶点被发现
     */
    color[v] = 'black';
    finishTime[v] = ++this.time;
  }

  print() {
    let result = '';

    this.vertices.forEach(item => {
      result += `${item} --> ${this.adjList.get(item).join(", ")} <br>`;
    });

    return result;
  }
}
