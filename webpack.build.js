const path = require('path');
const webpack = require('webpack');
const WebpackHTMLPlugin = require('webpack-html-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

const Visualizer = require('webpack-visualizer-plugin');

const config = require('./webpack.var');

module.exports = {
  devtool: false,
  entry: {
    'index': path.resolve(__dirname, './src/index.js'),
    'vendor': [
      'react', 'react-dom', 'react-router', 'react-router-redux', 'history',
      'redux', 'react-redux', 'redux-actions', 'redux-saga', 'prop-types',
      'react-motion', 'react-css-modules',
      'seamless-immutable', 'moment', 'isomorphic-fetch',
      // 'rc-pagination', 'rc-upload',
      'react-scrollbar', 'react-select', 'react-datepicker',
    ],
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'js/[name].bundle.[chunkhash:8].js',
    chunkFilename: 'js/[name].[id].[chunkhash:8].js',
    publicPath: '',
  },
  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: __dirname + '/my-loader',
            options: config.makeQueryString(config.vars)
          }
        ]
      },
      {
        test: /\.(css|scss)$/,
        // exclude: /node_module/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader'
        })
      }, {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=1000&name=images/[name]_[hash].[ext]'
      },
      {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        // loader: 'url-loader?limit=10240'
        loader: 'url-loader?limit=1024&name=fonts/[name].[ext]'
      }
    ]
  },
  resolve: {
    alias: {
      src: path.join(__dirname, 'src'),
      Soda: path.resolve(__dirname, './src/utils/Soda'),
      com: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      config: path.resolve(__dirname, './src/config'),
      reduxConfig: path.resolve(__dirname, './src/redux'),
    },
    extensions: ['.js', '.jsx', '.scss', '.less', '.html', '.json']
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
        PATH: JSON.stringify(''),
      }
    }),

    new webpack.ProvidePlugin({
      Soda: 'Soda'
    }),

    new ExtractTextPlugin('styles/styles.[hash].css'),
    new webpack.optimize.OccurrenceOrderPlugin(),

    new CleanWebpackPlugin(
      ['dist/js/**', 'dist/*.css', 'dist/styles/**'],　 //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    ),

    /*压缩优化代码开始  可以关掉*/
    new webpack.optimize.UglifyJsPlugin({
      minimize: true
    }),

    /*html*/
    new WebpackHTMLPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: true,
      favicon: './src/assets/images/favicon.png',
      'meta': {
        'Content-Security-Policy': { 'http-equiv': 'Content-Security-Policy', 'content': 'default-src https:' },
      }
    }),

    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),

    new webpack.optimize.CommonsChunkPlugin({
      async: 'used-twice',
      minChunks: (module, count) => (
        count >= 2
      )
    }),

    new webpack.LoaderOptionsPlugin({
      debug: false
    }),

    // new Visualizer(),
    new webpack.ProvidePlugin({
      react: 'react',
      React: 'react',
      ReactDOM: 'react-dom',
      'react-dom': 'react-dom',
      ReactRouter: 'react-router',
      moment: 'moment',
      redux: 'redux',
      'redux-saga': 'redux-saga',
      // history: 'history',
      'prop-types': 'prop-types',
      'seamless-immutable': 'seamless-immutable',
      Immutable: 'seamless-immutable',
      Soda: 'Soda'
    })
  ]
};
