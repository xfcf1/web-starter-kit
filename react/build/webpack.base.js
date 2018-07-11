const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootPath = path.join(__dirname, '..')
const templatePath = path.join(__dirname, 'index.html')
const DashboardPlugin = require('webpack-dashboard/plugin')
const config = require('./config')

module.exports = {
  entry: path.join(rootPath, 'src', 'index.js'),
  output: {
    filename: '[name].[hash].js',
    path: path.join(rootPath, config.outputDir)
  },
  resolve: {
    extensions: config.extensions,
    alias: config.alias
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      template: templatePath,
      filename: './index.html'
    }),
    new DashboardPlugin()
  ]
}
