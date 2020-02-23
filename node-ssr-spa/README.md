# 服务器端多页面渲染应用优化--刷新SSR,切页SPA
- node-ssr-spa 基于 node-multi-page 项目进行优化
- Node.js + Swig + Webpack + Gulp
- 编写自定义 webpack plugin 指定js插入位置
- Webpack 打包前端
- Gulp 打包后端

## 项目本地开发
- 打包编译前端，使用webpack进行监听：npm run build:dev
- 打包编译后端，使用gulp进行监听：npm run serverBuild:start
- 使用nodemon启动服务并监听整个项目

## Swig
- [Swig template engine](https://node-swig.github.io/swig-templates/)
- [Swig npm](https://www.npmjs.com/package/swig-templates)

## 性能优化
### pjax
- [pjax](https://github.com/defunkt/jquery-pjax)

### bigpipe
- 流 + 分块传输 (例子：BooksController.actionList)

### quicklink
- [Faster subsequent page-loads by prefetching in-viewport links during idle time](https://github.com/GoogleChromeLabs/quicklink)
