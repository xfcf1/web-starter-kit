const webpack = require('webpack')
const base = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

base.mode = 'production'
base.module.rules.push(
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
  }
)
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify('uat')
  }),
  new MiniCssExtractPlugin({
    filename: '[name].css',
    chunkFilename: '[id].css'
  })
)
module.exports = base
