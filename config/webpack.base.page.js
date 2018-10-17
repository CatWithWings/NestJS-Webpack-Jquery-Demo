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
    }),

    new HtmlWebpackPlugin({
      title: '抽象工厂模式',
      filename: '../views/abstract_factory.html',
      template: 'static/views/abstract_factory.html',
      chunks: [ 'base', 'abstract_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '建造者模式',
      filename: '../views/builder_factory.html',
      template: 'static/views/builder_factory.html',
      chunks: [ 'base', 'builder_factory.main'],
      chunksSortMode: 'manual'
    }),
  ];
}

module.exports = webpackPageConfig;