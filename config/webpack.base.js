const webpack = require('webpack'),
  HtmlWebpackPlugin = require('html-webpack-plugin'),
  MiniCssExtractPlugin = require('mini-css-extract-plugin'),
  glob = require('glob'),
  helpers = require('./helpers'),
  webpackPageConfig = require('./webpack.base.page')(HtmlWebpackPlugin),
  fs = require('fs'),
  path = require('path');

function resolve(...args) {
  return path.join(__dirname, ...args);
}

// 创建文件夹
if (!fs.existsSync(resolve('..', 'dist/static'))) {
  fs.mkdirSync(resolve('..', 'dist/static'));
}

if (!fs.existsSync(resolve('..', 'dist/static/public'))) {
  fs.mkdirSync(resolve('..', 'dist/static/public'));
}

if (!fs.existsSync(resolve('..', 'dist/static/public/js'))) {
  fs.mkdirSync(resolve('..', 'dist/static/public/js'));
}

// 拷贝文件
fs.copyFileSync(resolve('sw-demo-cache.js'), resolve('..', 'dist/static/public/js/sw-demo-cache.js'));

function entries() {
  var jsDir = helpers.root('static/public/js/project/'),
    entryFiles = glob.sync(jsDir + '**/*.main.{js,jsx}'),
    map = {},
    i = 0,
    len = entryFiles.length,
    filePath = "",
    filename = "";

  for (i = 0; i < len; i++) {
    filePath = entryFiles[i];
    filename = filePath.substring(filePath.lastIndexOf('\/') + 1, filePath.lastIndexOf('.'));
    map[filename] = filePath;
  }
  return map;
}

module.exports = {

  entry: Object.assign({
    'layout': ['./static/public/js/layout.js'],
    'base': ['./static/public/js/base.js']
  }, entries()),

  resolve: {
    extensions: ['.js'],
    alias: {
      '@STYLE_SHEETS': helpers.root('static/public/sass'),
      '@JS_LIB': helpers.root('static/public/js/lib'),
      '@JS_SHARE': helpers.root('static/public/js/share'),
      '@IMAGES': helpers.root('static/public/images')
    },
    enforceExtension: false
  },

  externals: {
    jquery: 'jQuery'
  },

  module: {
    rules: [{
        test: require.resolve('jquery'),
        use: [{
          loader: 'expose-loader',
          options: 'jQuery'
        }, {
          loader: 'expose-loader',
          options: '$'
        }]
      },
      {
        test: /\.(htm|html)$/i,
        loader: 'html-withimg-loader'
      },
      {
        test: /\.html$/,
        loader: 'html-loader'
      },

      {
        test: /\.jsx?$/,
        exclude: helpers.root('static/public/js'),
        loader: 'babel-loader'
      },

      { // awesome
        test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "url-loader",
        options: {
          limit: 10000,
          minetype: 'application/font-woff',
          name: 'fonts/[name].[hash].[ext]'
        }
      },
      { // awesome
        test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/,
        loader: "file-loader",
        options: {
          name: 'fonts/[name].[hash].[ext]'
        }
      },
      {
        test: /\.(png|jpe?g|gif|ico)$/,
        loader: "url-loader",
        options: {
          limit: 8192,
          name: 'img/[name].[hash].[ext]'
        }
      },
      {
        test: /\.css$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')({
                  autoprefixer: {
                    grid: true
                  }
                })
              ]
            }
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')({
                  autoprefixer: {
                    grid: true
                  }
                })
              ]
            }
          },
          'sass-loader'
        ]
      },
      {
        test: /\.less$/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1
            }
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: [
                require('postcss-preset-env')({
                  autoprefixer: {
                    grid: true
                  }
                })
              ]
            }
          },
          'less-loader'
        ]
      }
    ]
  },

  optimization: {
    minimize: true,
    splitChunks: {
      chunks: "async", // 只会提取异步加载模块的公共代码
      maxAsyncRequests: 5, //异步模块，一次最多只能被加载5个
      maxInitialRequests: 5, //入口模块最多只能加载5个
      cacheGroups: {
        vendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10
        }
      },
      minChunks: 1 // 至少被多少个chunk引用
    }
  },

  plugins: [
    ...webpackPageConfig
  ]
};