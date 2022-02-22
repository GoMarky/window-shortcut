const merge = require('webpack-merge');
const base = require('./webpack.config.base');
const path = require('path');

const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(base, {
  entry: './demo/main.ts',
  devtool: 'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, '..', 'build'),
    writeToDisk: true,
    port: 8080,
  },
  output: {
    path: path.resolve(__dirname, '..', 'build')
  },
  plugins: [
    new HtmlWebpackPlugin({
      inject: true,
      template: './demo/index.html'
    })
  ]
})
