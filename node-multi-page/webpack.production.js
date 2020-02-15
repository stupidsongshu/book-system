const path = require('path')
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const minify = require('html-minifier').minify

module.exports = {
  output: {
    path: path.join(__dirname, 'dist/assets'),
    filename: 'js/[name].[contenthash:8].js',
    publicPath: '/'
  },
  plugins: [
    // 压缩css
    new OptimizeCssAssetsPlugin({
      assetNameRegExp: /\.css$/g,
      cssProcessor: require('cssnano'),
      cssProcessorPluginOptions: {
        preset: ['default', { discardComments: { removeAll: true } }],
      },
      canPrint: true
    }),
    // 拷贝并压缩模板HTML
    new CopyPlugin([
      {
        from: path.join(__dirname, './src/web/views/layouts'),
        to: '../views/layouts',
        transform(content, path) {
          return minify(content.toString(), {
            collapseWhitespace: true,
            removeAttributeQuotes: true
          })
        },
      },
      {
        from: path.join(__dirname, './src/web/components'),
        to: '../components',
        transform(content, path) {
          return minify(content.toString(), {
            collapseWhitespace: true,
            removeAttributeQuotes: true
          })
        },
      },
      {
        from: path.join(__dirname, './src/web/views/index.html'),
        to: '../views/index.html',
        transform(content, path) {
          return minify(content.toString(), {
            collapseWhitespace: true,
            removeAttributeQuotes: true
          })
        },
      },
    ]),
  ]
}