var autoprefixer = require('autoprefixer');
var baseConfig = require('./base');
var webpack = require('webpack')
var MiniCssExtractPlugin = require('mini-css-extract-plugin');
var BundleTracker = require('webpack-bundle-tracker');
var path = require('path');
var nodeModulesDir = path.resolve(__dirname, 'node_modules');

baseConfig[0].mode = 'production'
baseConfig[1].mode = 'production'

baseConfig[1].entry = [
  'whatwg-fetch',
  '@babel/polyfill',
  './assets/js/index.js',
]

baseConfig[1].output = {
  path: path.resolve('./assets/webpack_bundles/'),
  publicPath: '',
  filename: '[name]-[hash].js',
}

baseConfig[1].module.rules.push({
  test: /\.jsx?$/,
  exclude: [nodeModulesDir],
  use: {
    loader: 'babel-loader',
    options: {
      presets: ['@babel/preset-env', '@babel/preset-react'],
    },
  },
},
{
  test: /\.(woff(2)?|eot|ttf)(\?v=\d+\.\d+\.\d+)?$/,
  loader: 'file-loader?name=fonts/[name].[ext]',
});

baseConfig[1].optimization = { minimize: true };

baseConfig[1].plugins = [
  new webpack.DefinePlugin({  // removes React warnings
    'process.env':{
      'NODE_ENV': JSON.stringify('production')
    }
  }),
  new MiniCssExtractPlugin({ filename: '[name]-[hash].css', disable: false, allChunks: true }),
  new BundleTracker({
    filename: './webpack-stats.json'
  }),
]

module.exports = baseConfig;
