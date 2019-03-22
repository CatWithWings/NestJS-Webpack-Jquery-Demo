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
    }),

    new HtmlWebpackPlugin({
      title: '影子节点-Events',
      filename: '../views/shadowDom/shadowDomEvents.html',
      template: 'static/views/shadowDom/shadowDomEvents.html',
      chunks: [ 'base', 'shadowDomEvents.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '影子节点-Temple',
      filename: '../views/shadowDom/templeElement.html',
      template: 'static/views/shadowDom/templeElement.html',
      chunks: [ 'base', 'templeElement.main'],
      chunksSortMode: 'manual'
    })
  ]
}