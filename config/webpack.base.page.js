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
      filename: '../views/pattern/simple_factory.html',
      template: 'static/views/pattern/simple_factory.html',
      chunks: [ 'base', 'simple_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '抽象工厂模式',
      filename: '../views/pattern/abstract_factory.html',
      template: 'static/views/pattern/abstract_factory.html',
      chunks: [ 'base', 'abstract_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '建造者模式',
      filename: '../views/pattern/builder_factory.html',
      template: 'static/views/pattern/builder_factory.html',
      chunks: [ 'base', 'builder_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '适配器模式',
      filename: '../views/pattern/adapter_factory.html',
      template: 'static/views/pattern/adapter_factory.html',
      chunks: [ 'base', 'adapter_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '装饰者模式',
      filename: '../views/pattern/decorator_factory.html',
      template: 'static/views/pattern/decorator_factory.html',
      chunks: [ 'base', 'decorator_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '桥接模式',
      filename: '../views/pattern/bridge_factory.html',
      template: 'static/views/pattern/bridge_factory.html',
      chunks: [ 'base', 'bridge_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '组合模式',
      filename: '../views/pattern/group_factory.html',
      template: 'static/views/pattern/group_factory.html',
      chunks: [ 'base', 'group_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '享元模式',
      filename: '../views/pattern/share_factory.html',
      template: 'static/views/pattern/share_factory.html',
      chunks: [ 'base', 'share_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '模板方法模式',
      filename: '../views/pattern/template_factory.html',
      template: 'static/views/pattern/template_factory.html',
      chunks: [ 'base', 'template_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '观察者模式',
      filename: '../views/pattern/observers_factory.html',
      template: 'static/views/pattern/observers_factory.html',
      chunks: [ 'base', 'observers_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '状态模式',
      filename: '../views/pattern/state_factory.html',
      template: 'static/views/pattern/state_factory.html',
      chunks: [ 'base', 'state_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '策略模式',
      filename: '../views/pattern/strategy_factory.html',
      template: 'static/views/pattern/strategy_factory.html',
      chunks: [ 'base', 'strategy_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '责任链模式',
      filename: '../views/pattern/response_chain_factory.html',
      template: 'static/views/pattern/response_chain_factory.html',
      chunks: [ 'base', 'response_chain_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '命令模式',
      filename: '../views/pattern/command_factory.html',
      template: 'static/views/pattern/command_factory.html',
      chunks: [ 'base', 'command_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '中介模式',
      filename: '../views/pattern/intermediary_factory.html',
      template: 'static/views/pattern/intermediary_factory.html',
      chunks: [ 'base', 'intermediary_factory.main'],
      chunksSortMode: 'manual'
    }),

    new HtmlWebpackPlugin({
      title: '解释器模式',
      filename: '../views/pattern/interpreter_factory.html',
      template: 'static/views/pattern/interpreter_factory.html',
      chunks: [ 'base', 'interpreter_factory.main'],
      chunksSortMode: 'manual'
    }),

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
    })
  ];
}

module.exports = webpackPageConfig;