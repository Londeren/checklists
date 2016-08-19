var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');
var config = require('./config');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './frontend/index'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        'NODE_ENV': JSON.stringify('development')
      },
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false,
      config: {
        base_path: JSON.stringify(config.get('base_path'))
      }
    }),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin("styles.css", {
      allChunks: true
    })
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['react-hot', 'babel-loader'],
        include: path.join(__dirname, 'frontend')
      },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'frontend'),
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      },
      {test: /\.json$/, loader: 'json'}
    ]
  }
};
