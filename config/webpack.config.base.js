const webpack = require('webpack')
const config = require('../package.json')
const path = require('path');

module.exports = {
  entry: './src/index.ts',
  module: {
    rules: [
      {
        test: /.js$/,
        use: 'babel-loader',
      },
      {
        test: /.ts$/,
        use: 'ts-loader'
      }
    ],
  },
  resolve: {
    alias: {
      '@': path.join(__dirname, '..', 'src'),
    },
    extensions: ['.tsx', '.ts', '.js'],
  },
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(config.version),
    }),
  ],
}
