const webpack = require('webpack')
const config = require('../package.json')

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
  plugins: [
    new webpack.DefinePlugin({
      'VERSION': JSON.stringify(config.version),
    }),
  ],
}
