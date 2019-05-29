import SimpleGraph from './simpleGraph';

class GraphApp {
  constructor() {
    this.simpleGraph = new SimpleGraph();
    this.DAG = new SimpleGraph();
    this.init();
  }

  init() {
    this.bindEvents();
  }

  setSimpleGraph() {
    const vertexs = ['A', 'B', 'C', 'D', 'E', 'F', 'I', 'G', 'H'];
    vertexs.forEach(item => {
      this.simpleGraph.addVertex(item);
    });

    const result = this.simpleGraph
      .addEdge('A', 'B')
      .addEdge('A', 'C')
      .addEdge('A', 'D')
      .addEdge('B', 'E')
      .addEdge('B', 'F')
      .addEdge('E', 'I')
      .addEdge('C', 'D')
      .addEdge('C', 'G')
      .addEdge('D', 'G')
      .addEdge('D', 'H')
      .print();

    // 广度优先遍历
    const btsRecord = [];
    const pathsBts = this.simpleGraph.bts('A', u => {
      btsRecord.push(u);
    });

    // 深度优先遍历
    const dfsRecord = [];
    const pathsDfs = this.simpleGraph.dfs('A', u => {
      dfsRecord.push(u);
    })

    console.log("广度搜索法-->", pathsBts);
    console.log("深度搜索法 -->", pathsDfs);
    
    $('#simpleGraph')
      .empty()
      .append(`${result}<br>`)
      .append(`<div>Visited vertex (广度优先过程) --> ${btsRecord.join('->')}</div>`)
      .append(`<div>Visited vertex (深度优先过程) --> ${dfsRecord.join('->')}</div>`);
  }

  // 设置有向无环图测试拓扑排序 (使用深度优先算法)
  setDAG() {
    const vertexs = ['A', 'B', 'C', 'D', 'E', 'F'];
    vertexs.forEach(item => {
      this.DAG.addVertex(item);
    });

    const result = this.DAG
      .addEdge('A', 'C')
      .addEdge('A', 'D')
      .addEdge('B', 'D')
      .addEdge('B', 'E')
      .addEdge('C', 'F')
      .addEdge('F', 'E')
      .print();

    const dfsRecord = [];
    const pathsDfs = this.DAG.dfs('A', u => {
      dfsRecord.push(u);
    });

    // 按照由大到小排列，就可以得到一个有向无环图的拓扑排序
    const finishTimes = pathsDfs.finishTime;
    const finishTimesArr = [];
    for (let key in finishTimes) {
      const temp = { key, value: finishTimes[key] };
      finishTimesArr.push(temp);
    }
    const dag = finishTimesArr.sort((a, b) => {
        return  b.value - a.value;
      })
      .map((item) => item.key);

    $('#dagGraph') 
      .empty()
      .append(`${result}<br>`)
      .append(`
        <div>Visited vertex (深度优先过程) --> ${dfsRecord.join('->')}</div>
      `);
    $('#dagList')
      .empty()
      .append(dag.join(" - "));
  }

  bindEvents() {
    $('#setSimpleGraph').on('click', () => this.setSimpleGraph());
    $('#setDagGraph').on('click', () => this.setDAG());
  }
}

new GraphApp();
