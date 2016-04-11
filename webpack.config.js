var path = require('path');
var webpack = require('webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  devtool: 'eval',
  entry: [
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './src/index'
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
      '__DEVTOOLS__': process.env.DEVTOOLS === 'true' ? true : false
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
      include: path.join(__dirname, 'src')
    },
      {
        test: /(\.css|\.scss)$/,
        include: path.join(__dirname, 'src'),
        loader: ExtractTextPlugin.extract('style', 'css!sass')
      }
    ]
  }
};
