const path = require('path')
const webpack = require('webpack')
const base = require('./webpack.base')
const config = require('./config')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

base.mode = 'development'
base.module.rules.push({
  test: /\.css$/,
  use: [MiniCssExtractPlugin.loader, 'css-loader']
})
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify('uat')
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
)
base.devServer = {
  contentBase: path.join(__dirname, '..', config.outputDir),
  compress: true,
  port: config.port,
  historyApiFallback: true
}
module.exports = base
