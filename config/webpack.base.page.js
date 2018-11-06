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

    new HtmlWebpackPlugin({
      title: '适配器模式',
      filename: '../views/adapter_factory.html',
      template: 'static/views/adapter_factory.html',
      chunks: [ 'base', 'adapter_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '装饰者模式',
      filename: '../views/decorator_factory.html',
      template: 'static/views/decorator_factory.html',
      chunks: [ 'base', 'decorator_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '桥接模式',
      filename: '../views/bridge_factory.html',
      template: 'static/views/bridge_factory.html',
      chunks: [ 'base', 'bridge_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '组合模式',
      filename: '../views/group_factory.html',
      template: 'static/views/group_factory.html',
      chunks: [ 'base', 'group_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '享元模式',
      filename: '../views/share_factory.html',
      template: 'static/views/share_factory.html',
      chunks: [ 'base', 'share_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '模板方法模式',
      filename: '../views/template_factory.html',
      template: 'static/views/template_factory.html',
      chunks: [ 'base', 'template_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '观察者模式',
      filename: '../views/observers_factory.html',
      template: 'static/views/observers_factory.html',
      chunks: [ 'base', 'observers_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '状态模式',
      filename: '../views/state_factory.html',
      template: 'static/views/state_factory.html',
      chunks: [ 'base', 'state_factory.main'],
      chunksSortMode: 'manual'
    }),
  ];
}

module.exports = webpackPageConfig;