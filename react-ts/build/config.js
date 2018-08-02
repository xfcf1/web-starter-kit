const path = require('path')

module.exports = {
  port: '9000',
  title: 'demo',
  outputDir: 'dist',
  alias: {
    '~config': path.join(__dirname, 'config.js')
  },
  extensions: ['.ts', '.tsx', '.js', '.json']
}
