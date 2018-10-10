function webpackPageConfig(HtmlWebpackPlugin) {
  return [

    // layout文件
    new HtmlWebpackPlugin({
      filename: '../views/layouts/main.html',
      template: 'static/views/layouts/main.html',
      chunks: ['layout']
    }),

    new HtmlWebpackPlugin({
      title: '首页',
      filename: '../views/index.html', // 输出的位置相对于output.path
      template: 'static/views/index.html',
      chunks: [ 'base', 'index.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '简单工厂模式',
      filename: '../views/simple_factory.html',
      template: 'static/views/simple_factory.html',
      chunks: [ 'base', 'simple_factory.main'],
      chunksSortMode: 'manual'
    })
  ];
}

module.exports = webpackPageConfig;