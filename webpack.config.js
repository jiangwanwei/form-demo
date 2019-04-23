const path = require('path')
const webpack = require('webpack')
const WebpackHTMLPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const extractCSS = new ExtractTextPlugin('styles/styles.css')

module.exports = {
  entry: path.resolve(__dirname, './src/index.js'),
  resolve: {
    extensions: ['.js', '.jsx', '.scss', '.json'],
    alias: {
      src: path.join(__dirname, 'src'),
      Soda: path.resolve(__dirname, './src/utils/Soda'),
      com: path.resolve(__dirname, './src/components'),
      utils: path.resolve(__dirname, './src/utils'),
      assets: path.resolve(__dirname, './src/assets'),
      config: path.resolve(__dirname, './src/config'),
      reduxConfig: path.resolve(__dirname, './src/redux'),
    },
  },
  output: {
    path: path.resolve(__dirname, './dist'),
    publicPath: '//localhost:3000/',
    filename: 'bundle.js',
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
        NODE_ENV: JSON.stringify('dev'),
      },
    }),

    extractCSS,

    /*压缩优化代码结束*/
    new WebpackHTMLPlugin({
      template: './src/index.html',
      filename: './index.html',
      inject: true
    }),

    new webpack.HotModuleReplacementPlugin(),

    new webpack.LoaderOptionsPlugin({
      debug: true,
    }),
  ],
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist',
    port: 3000,
  },
}
