const webpack = require('webpack')
const path = require('path')
const config = require('./config')
const base = require('./webpack.base')
const rootPath = path.join(__dirname, '..')

base.mode = 'development'
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify('local')
  })
)
base.module.rules.push(
  {
    test: /\.css$/,
    use: [
      'style-loader',
      'css-loader'
    ]
  },
  {
    test: /\.s[ac]ss$/,
    use: [
      'style-loader',
      'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]',
      'sass-loader'
    ]
  }
)
base.devServer = {
  port: config.port,
  compress: true,
  contentBase: path.join(rootPath, config.outputDir),
  historyApiFallback: true
}
module.exports = base
