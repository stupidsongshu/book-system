import Books from '../models/books'
const books = new Books()

export default class BooksController {
  constructor() {}
  async actionList(ctx, next) {
    const result = await books.getData({
      url: 'book/index'
    })
    console.log('books list===', result)
    const html = await ctx.render('book/list', {
      data: result
    })
    ctx.body = html
  }
}