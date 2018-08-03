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
    test: /\.s[ac]ss$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader?modules&localIdentName=[name]__[local]___[hash:base64:5]&minimize',
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
