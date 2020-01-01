const path = require('path')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  plugins: [
    new CopyPlugin([
      { from: path.join(__dirname, './src/web/views/layouts'), to: '../views/layouts' },
      { from: path.join(__dirname, './src/web/components'), to: '../components' },
    ]),
  ]
}