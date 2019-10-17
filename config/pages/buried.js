module.exports = function(HtmlWebpackPlugin) {
  // 埋点相关
  return [
    new HtmlWebpackPlugin({
      title: '页面性能',
      filename: '../views/buried/performance.html',
      template: 'static/views/buried/performance.html',
      chunks: [ 'base', 'performance.main'],
      chunksSortMode: 'manual'
    })
  ]
}