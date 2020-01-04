// const Koa = require('koa')
import Koa from 'koa'
import serve from 'koa-static'
import render from 'koa-swig'
import { wrap } from 'co'
import log4js from 'log4js'
import { createContainer, Lifetime } from 'awilix'
import { loadControllers, scopePerRequest } from 'awilix-koa'
import ErrorHandler from './middlewares/error'
import config from './config'

const app = new Koa()

// 1. 创建容器
const container = createContainer()
// 2. 把controller需要的service注册进容器
container.loadModules([__dirname + ['/services/*.js']], {
  formatName: 'camelCase',
  resolverOptions: {
    lifetime: Lifetime.SCOPED
  }
})
// 3. 合并容器与路由
app.use(scopePerRequest(container))

// 日志配置
log4js.configure({
  appenders: { cheese: { type: 'file', filename: __dirname + '/logs/error.log' } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})

// 静态服务
app.use(serve(config.staticDir, {
  // maxage: 24 * 60 * 60 * 1000
  maxage: 0
}))

// 模板引擎
app.context.render = wrap(render({
  root: config.viewDir,
  autoescape: true, // 转义字符防止xss攻击
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}))

const logger = log4js.getLogger('cheese');
ErrorHandler.error(app, logger)

// 4. 加载所有路由
app.use(loadControllers(__dirname + '/controllers/*.js'))

app.listen(config.port, () => {
  console.log(`Server is listening on port: ${config.port}`)
})
