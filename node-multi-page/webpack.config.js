const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PostHtmlPlugin = require('./plugins/PostHtmlPlugin3')

// const files = glob.sync('./src/web/views/*/entries/([a-zA-Z+-a-zA-Z+]).entry.js')
const files = glob.sync(path.join(__dirname, './src/web/views/*/entries/*.entry.js'))
console.log(files)

let entries = {}
let htmlPlugins = []

files.forEach(url => {
  const entryName = /([a-zA-Z]+-[a-zA-Z]+)\.entry\.js/.exec(url)[1]
  console.log('entryName::', entryName) // 'books-index'
  const [dirName, pageName] = entryName.split('-')
  entries[entryName] = url
  htmlPlugins.push(new HtmlWebpackPlugin({
    template: path.join(__dirname, `./src/web/views/${dirName}/pages/${pageName}.html`),
    filename: `../views/${dirName}/pages/${pageName}.html`,
    chunks: [entryName],
    inject: false
  }))
})


module.exports = {
  mode: 'development',
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: '[name].bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new PostHtmlPlugin()
  ]
}
