const webpack = require('webpack')
const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const config = require('./config')
const rootPath = path.join(__dirname, '..')
const templatePath = path.join(__dirname, 'index.html')

module.exports = {
  mode: 'development',
  entry: path.join(rootPath, 'src', 'index.tsx'),
  output: {
    filename: 'app.js',
    path: path.join(rootPath, 'dist')
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: ['awesome-typescript-loader'],
        exclude: /node_modules/
      },
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
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: config.title,
      template: templatePath,
      filename: './index.html'
    })
  ],
  devServer: {
    port: 9000,
    contentBase: path.join(rootPath, 'dist')
  }
}
