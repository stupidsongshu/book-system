import Books from '../models/books'
const books = new Books()

export default class BooksController {
  constructor() {}
  async actionIndex(ctx, next) {
    // const result = await books.getData({
    //   url: 'book/index'
    // })
    // console.log('books list===', result)
    const html = await ctx.render('books/pages/index', {
      data: 'result.data index'
    })
    ctx.body = html
  }

  async actionList(ctx, next) {
    // const result = await books.getData({
    //   url: 'book/index'
    // })
    // console.log('books list===', result)
    const html = await ctx.render('books/pages/list', {
      data: 'result.data list'
    })
    ctx.body = html
  }

  async actionCreate(ctx, next) {
    // const result = await books.getData({
    //   url: 'book/index'
    // })
    // console.log('books list===', result)
    const html = await ctx.render('books/pages/create', {
      data: 'result.data create'
    })
    ctx.body = html
  }
}