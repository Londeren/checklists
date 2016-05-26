var webpack = require('webpack');
var WebpackDevServer = require('webpack-dev-server');
var webpackConfig = require('./webpack.config');
var config = require('./config');

new WebpackDevServer(webpack(webpackConfig), {
  publicPath: webpackConfig.output.publicPath,
  hot: true,
  historyApiFallback: true
}).listen(config.get('dev_server_port'), 'localhost', function (err, result) {
  if (err) {
    console.log(err);
  }

  console.log('Listening at ' + config.get('base_path'));
});
