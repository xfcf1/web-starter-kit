const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const rootPath = path.join(__dirname, '..')
const templatePath = path.join(__dirname, 'index.html')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
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
        test: /\.vue$/,
        use: 'vue-loader',
        exclude: /node_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|ttf|eot|woff|woff2)$/,
        use: 'url-loader'
      }
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: config.title,
      template: templatePath,
      filename: './index.html'
    })
  ]
}
