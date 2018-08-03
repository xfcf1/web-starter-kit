const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const rootPath = path.join(__dirname, '..')
const templatePath = path.join(__dirname, 'index.html')

module.exports = {
  entry: path.join(rootPath, 'src', 'index.tsx'),
  output: {
    filename: '[name].[hash:8].js',
    path: path.join(rootPath, config.outputDir)
  },
  resolve: {
    alias: config.alias,
    extensions: config.extensions
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      template: templatePath,
      filename: './index.html'
    })
  ]
}
