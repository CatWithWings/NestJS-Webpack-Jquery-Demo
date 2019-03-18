const pattern = require("./pages/pattern");
const arithmetic = require("./pages/arithmetic");
const shadowDom = require("./pages/shadowDom");

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

    ...pattern(HtmlWebpackPlugin),

    ...arithmetic(HtmlWebpackPlugin),

    ...shadowDom(HtmlWebpackPlugin)
  ];
}

module.exports = webpackPageConfig;