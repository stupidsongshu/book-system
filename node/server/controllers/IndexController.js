export default class IndexController {
  constructor() {}
  async actionIndex (ctx, next) {
    // throw new Error('this is an error')
    ctx.body = await ctx.render('index', {
      data: '<script>alert(0)</script>'
    })
  }
}