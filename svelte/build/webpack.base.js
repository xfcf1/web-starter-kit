const path = require('path')
const rootPath = path.join(__dirname, '..')
const config = require('./config')

module.exports = {
  entry: {
    index: path.join(rootPath, 'src', 'index.js')
  },
  output: {
    filename: '[name].js',
    path: path.join(rootPath, config.outputDir)
  },
  resolve: {
    extensions: config.extensions,
    alias: config.alias
  },
  module: {
    rules: [
      {
        test: /\.(html|svelte)$/,
        exclude: /node_modules/,
        use: ['svelte-loader']
      }
    ]
  },
  plugins: []
}
