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
    })
  ];
}

module.exports = webpackPageConfig;