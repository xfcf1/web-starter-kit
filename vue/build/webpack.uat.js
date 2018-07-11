const webpack = require('webpack')
const base = require('./webpack.base')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

base.mode = 'production'
base.module.rules.push(
  {
    test: /\.css$/,
    use: [MiniCssExtractPlugin.loader, 'css-loader']
  },
  {
    test: /\.scss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader?minimize',
      'postcss-loader',
      'sass-loader'
    ]
  }
)
base.plugins.push(
  new webpack.DefinePlugin({
    'process.env.APP_ENV': JSON.stringify('uat')
  }),
  new MiniCssExtractPlugin({
    filename: '[name].[hash].css',
    chunkFilename: '[id].[hash].css'
  })
)
module.exports = base
