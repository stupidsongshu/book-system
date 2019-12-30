// 注意版本问题：以下适合 html-webpack-plugin 版本3.2.0
class PostHtmlPlugin {
  apply (compiler) {
    // tap(触及) 到 compilation hook，而在 callback 回调时，会将 compilation 对象作为参数，
    compiler.hooks.compilation.tap('HelloCompilationPlugin', compilation => {
      // 现在，通过 compilation 对象，我们可以 tap(触及) 到各种可用的 hooks 了
      compilation.hooks.htmlWebpackPluginAfterHtmlProcessing.tap('HelloCompilationPlugin', (data) => {
        // console.log('正在优化资源。：：：', data);
        const jsArr = data.assets.js.map(js => {
          return `<script src="${js}"></script>`
        })
        data.html = data.html.replace('<!-- injectjs -->', jsArr.join(''))
      });
    });
  }
}

module.exports = PostHtmlPlugin
