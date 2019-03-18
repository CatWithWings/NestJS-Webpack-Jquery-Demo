module.exports = function(HtmlWebpackPlugin) {
  // 影子节点
  return [
    new HtmlWebpackPlugin({
      title: '影子节点-Simple',
      filename: '../views/shadowDom/simpleShadow.html',
      template: 'static/views/shadowDom/simpleShadow.html',
      chunks: [ 'base', 'simpleShadow.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '影子节点-自定义元素',
      filename: '../views/shadowDom/customerElement.html',
      template: 'static/views/shadowDom/customerElement.html',
      chunks: [ 'base', 'customerElement.main'],
      chunksSortMode: 'manual'
    })
  ]
}