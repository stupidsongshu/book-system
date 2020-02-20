// const Koa = require('koa')
const path = require('path')
import Koa from 'koa'
import KoaRouter from 'koa-router'
import serve from 'koa-static'
import render from 'koa-swig'
import { wrap } from 'co'
import log4js from 'log4js'
import ErrorHandler from './middlewares/error'
import config from './config'
import controllers from './controllers'

const app = new Koa()

const router = new KoaRouter()

app.use(serve(config.staticDir, {
  // maxage: 24 * 60 * 60 * 1000
  maxage: 0
}))

app.context.render = wrap(render({
  root: config.viewDir,
  autoescape: true, // 转义字符防止xss攻击
  cache: 'memory', // disable, set to false
  ext: 'html',
  writeBody: false
}))

log4js.configure({
  appenders: { cheese: { type: 'file', filename: path.join(__dirname, '../logs/error.log') } },
  categories: { default: { appenders: ['cheese'], level: 'error' } }
})
const logger = log4js.getLogger('cheese');
// logger.trace('Entering cheese testing');
// logger.debug('Got cheese.');
// logger.info('Cheese is Comté.');
// logger.warn('Cheese is quite smelly.');
// logger.error('Cheese is too ripe!');
// logger.fatal('Cheese was breeding ground for listeria.');

// process.on('uncaughtException', (err) => {
//   console.log('uncaughtException error:', err)
// })
// app.on('error', (err) => {
//   // console.log('koa error:', err)
//   // TODO log
// })

ErrorHandler.error(app, logger)

// router.get('/', async (ctx) => {
//   // throw new Error('this is an error')
//   ctx.body = await ctx.render('index', {
//     data: '<script>alert(0)</script>'
//   })
// })

controllers(router)

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(config.port, () => {
  console.log(`Server is listening on port: ${config.port}`)
})
