const webpack = require('webpack'),
  webpackMerge = require('webpack-merge'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  commonConfig = require('./webpack.base.js'),
  helpers = require('./helpers'),
  ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin');

module.exports = webpackMerge(commonConfig, {
  mode: 'development',

  output: {
    path: helpers.root('dist/static/public'),
    publicPath: '/',
    filename: "js/[name].[chunkhash].js",
    chunkFilename: 'js/[name].[chunkhash:5].chunk.js',
    libraryTarget: "umd"
  },

  plugins: [
    new MiniCssExtractPlugin({
      filename: "css/[name].[chunkhash:5].css",
    }),

    new ParallelUglifyPlugin({
      cacheDir: './build_cache/',
      sourceMap: true,
      uglifyJS: {
        compress: {
          warnings: false, // 删除所有的 `console`
          comparisons: false,
          drop_console: true, // 在UglifyJs删除没有用到的代码时不输出警告
          collapse_vars: true, // 内嵌定义了但是只用到一次的变量
          reduce_vars: true, // 提取出出现多次但是没有定义成变量去引用的静态值
        },
        output: {
          beautify: false,
          comments: false,
        }
      }
    })
  ]
});