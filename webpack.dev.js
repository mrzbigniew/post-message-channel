const merge = require('webpack-merge');
const config = require('./webpack.prod.js');

module.exports = merge(config, {
  mode: 'development',
  devtool: 'inline-source-map',
  devServer: {
    contentBase: './dist'
  }
});
