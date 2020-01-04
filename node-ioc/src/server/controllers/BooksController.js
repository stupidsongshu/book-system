// import Books from '../models/books'
// const books = new Books()
import { route, GET } from 'awilix-koa'

@route('/books')
export default class BooksController {
  constructor({ booksServices }) {
    this.booksServices = booksServices
  }

  @route('/index')
  @GET()
  async actionIndex(ctx, next) {
    const result = await this.booksServices.getData({
      url: 'book/index'
    })
    console.log('books list===', result)
    const html = await ctx.render('books/pages/index', {
      data: result.data.data
    })
    ctx.body = html
  }

  @route('/list')
  @GET()
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

  @route('/create')
  @GET()
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