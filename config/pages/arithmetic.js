module.exports = function(HtmlWebpackPlugin) {
  // 算法-数据结构
  return [
    new HtmlWebpackPlugin({
      title: '算法-数组/栈',
      filename: '../views/arithmetic/array.html',
      template: 'static/views/arithmetic/array.html',
      chunks: [ 'base', 'array.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-队列',
      filename: '../views/arithmetic/queue.html',
      template: 'static/views/arithmetic/queue.html',
      chunks: [ 'base', 'queue.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-链表',
      filename: '../views/arithmetic/linkList.html',
      template: 'static/views/arithmetic/linkList.html',
      chunks: [ 'base', 'linkList.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-集合',
      filename: '../views/arithmetic/set.html',
      template: 'static/views/arithmetic/set.html',
      chunks: [ 'base', 'set.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-字典与散列表',
      filename: '../views/arithmetic/dictionary.html',
      template: 'static/views/arithmetic/dictionary.html',
      chunks: [ 'base', 'dictionary.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-树',
      filename: '../views/arithmetic/tree.html',
      template: 'static/views/arithmetic/tree.html',
      chunks: [ 'base', 'tree.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-图',
      filename: '../views/arithmetic/graph.html',
      template: 'static/views/arithmetic/graph.html',
      chunks: [ 'base', 'graph.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-排序',
      filename: '../views/arithmetic/sort.html',
      template: 'static/views/arithmetic/sort.html',
      chunks: [ 'base', 'sort.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '算法-模式',
      filename: '../views/arithmetic/models.html',
      template: 'static/views/arithmetic/models.html',
      chunks: [ 'base', 'models.main'],
      chunksSortMode: 'manual'
    })
  ]
}