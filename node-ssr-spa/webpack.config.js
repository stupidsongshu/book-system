const path = require('path')
const glob = require('glob')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const argv = require('yargs').argv
const merge = require('webpack-merge')
const colors = require('colors')
const PostHtmlPlugin = require('./plugins/PostHtmlPlugin3')

const mode = argv.mode
console.log(colors.cyan('webpack编译环境：'), colors.yellow(mode))
const envConfig = require(`./webpack.${mode}.js`)

// 多页配置 start
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
    inject: false, // 关闭静态资源 js/css 注入，使用自定义plugin指定 script/link 的插入位置
    chunks: ['runtime', entryName],
    minify: {
      collapseWhitespace: true,
      removeAttributeQuotes: true,
      removeComments: false
    }
  }))
})
// 多页配置 end

const baseConfig = {
  mode,
  entry: entries,
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'js/[name].bundle.js',
    publicPath: '/'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        // use: ['style-loader', 'css-loader']
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              // you can specify a publicPath here
              // by default it uses publicPath in webpackOptions.output
              publicPath: './',
              // hmr: process.env.NODE_ENV === 'development',
            }
          },
          'css-loader'
        ]
      }
    ]
  },
  plugins: [
    ...htmlPlugins,
    new PostHtmlPlugin(),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: 'styles/[name].css',
      // chunkFilename: '[id].css',
    })
  ],
  optimization: {
    runtimeChunk: {
      name: 'runtime'
    }
  }
}

module.exports = merge(baseConfig, envConfig)
