const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base')
const config = require('./config')

base.mode = 'development'
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify('local')
  })
)
base.module.rules.push(
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader']
  },
  {
    test: /\.scss$/,
    use: [
      'style-loader',
      'css-loader',
      'sass-loader'
    ]
  }
)
base.devServer = {
  contentBase: path.join(__dirname, '..', config.outputDir),
  compress: true,
  port: config.port,
  historyApiFallback: true
}
module.exports = base
