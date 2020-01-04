import { route, GET } from 'awilix-koa'

@route('/')
export default class IndexController {
  @route('/')
  @GET()
  async actionIndex (ctx, next) {
    // throw new Error('this is an error')
    ctx.body = await ctx.render('index', {
      data: '<script>alert(0)</script>'
    })
  }
}