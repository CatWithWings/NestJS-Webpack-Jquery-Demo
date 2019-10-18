module.exports = function(HtmlWebpackPlugin) {
  // 埋点相关
  return [
    new HtmlWebpackPlugin({
      title: '页面性能',
      filename: '../views/buried/performance.html',
      template: 'static/views/buried/performance.html',
      chunks: [ 'base', 'performance.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '埋点信息',
      filename: '../views/buried/buriedInfos.html',
      template: 'static/views/buried/buriedInfos.html',
      chunks: [ 'base', 'buriedInfos.main'],
      chunksSortMode: 'manual'
    })
  ]
}