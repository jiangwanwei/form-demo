const path = require('path')
const webpack = require('webpack')
const WebpackHTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const extractCSS = new ExtractTextPlugin('styles/styles.css')

module.exports = {
  entry: {
    'index': path.resolve(__dirname, './src/index.js'),
    'vendor': [
      'react', 'react-dom',  'prop-types', 'moment',  'react-datepicker',
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    alias: {
      src: path.join(__dirname, 'src'),
      com: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      config: path.resolve(__dirname, './src/config'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '//localhost:3000/',
    filename: 'js/[name].bundle.[chunkhash:8].js',
    chunkFilename: 'js/field_[name].[chunkhash:8].js',
    crossOriginLoading: 'anonymous',
  },

  module: {
    loaders: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
          },
        ],
      }, {
        test: /\.(css|scss)$/,
        exclude: /node_modules/,
        use: extractCSS.extract({
          fallback: 'style-loader',
          use: 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!sass-loader!postcss-loader',
        }),
      },
      {
        test: /\.(png|jpg|gif)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=3000&name=images/[name]_[hash].[ext]',
      }, {
        test: /\.(woff|woff2|eot|ttf|svg)$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10240&name=fonts/[name].[ext]',
      },
    ],
  },

  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify('production'),
      },
    }),

    new CleanWebpackPlugin(
      ['dist/js/**'],　 //匹配删除的文件
      {
        root: __dirname,       　　　　　　　　　　//根目录
        verbose: true,        　　　　　　　　　　//开启在控制台输出信息
        dry: false        　　　　　　　　　　//启用删除文件
      }
    ),

    extractCSS,

    /*压缩优化代码结束*/
    new WebpackHTMLPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: true
    }),

    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.optimize.CommonsChunkPlugin({
      name: ['vendor', 'manifest']
    }),

    // new webpack.optimize.CommonsChunkPlugin({
    //   async: 'used-twice',
    //   minChunks: (module, count) => (
    //     count >= 2
    //   )
    // }),

    new webpack.LoaderOptionsPlugin({
      debug: false
    }),
  ],
  devtool: false,
}
