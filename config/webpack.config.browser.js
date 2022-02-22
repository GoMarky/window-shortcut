const merge = require('webpack-merge')
const base = require('./webpack.config.base')
const path = require('path')
const { outputFile, globalName } = require('./helpers');

module.exports = merge(base, {
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: outputFile + '.browser.js',
    library: globalName,
    libraryTarget: 'umd',
  },
  externals: {},
  optimization: {
    minimize: true,
  },
})
