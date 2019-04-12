// Webpack dev server
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
const config = require('./webpack/webpack.dev.babel');

/*
Webpack server configuration and entry point.

TODO:
  - Make port read from env settings.
  - Move logging to Middleware.
*/
new WebpackDevServer(webpack(config), {
  publicPath: config.output.publicPath,
  hot: true,
  inline: true,
  historyApiFallback: true,
  headers: { 'Access-Control-Allow-Origin': '*' }
}).listen(3000, '0.0.0.0', (err) => {
  if (err) {
    console.log(err);
  }

  console.log('Listening at 0.0.0.0:3000');
});
