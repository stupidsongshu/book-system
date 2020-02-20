import Books from '../models/books'
import cheerio from 'cheerio'

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
      data: [
        {
          id: 1,
          name: 'JavaScript 高级程序设计',
          author: 'Nigolas'
        },
        {
          id: 2,
          name: 'HTTP 权威指南',
          author: '张三'
        },
        {
          id: 3,
          name: 'CSS 世界',
          author: '李四'
        }
      ]
    })
    if (ctx.header['x-pjax']) {
      // 切页局部加载
      const $ = cheerio.load(html)
      // const htmlResult = $.html('#books-list-content') // outerHTML
      const htmlResult = $('#books-list-content').html() // innerHTML
      const jsResult = $.html('.lazyload-js')
      ctx.body = htmlResult + jsResult
    } else {
      // 刷新全量加载
      ctx.body = html
    }
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