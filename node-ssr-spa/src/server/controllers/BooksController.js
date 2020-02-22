import Books from '../models/books'
import cheerio from 'cheerio'
import { Readable } from 'stream'

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

  async actionList(ctx, next) {
    // const result = await books.getData({
    //   url: 'book/index'
    // })
    // console.log('books list===', result)

    function createSSRStreamPromise(ctx, content) {
      return new Promise((resolve, reject) => {
        const stream = new Readable()
        stream.push(content)
        stream.push(null)
        stream.on('data', (chunk) => {
          ctx.res.write(chunk)
        })
        stream.on('error', (err) => {
          reject(err)
        })
        stream.on('end', () => {
          ctx.res.end()
        })
      })
    }

    const html = await ctx.render('books/pages/list', {
      data: [
        {
          id: 1,
          name: 'JavaScript 高级程序设计',
          author: 'Nicholas'
        },
        {
          id: 2,
          name: 'HTTP权威指南',
          author: 'David Gourley / Brian Totty'
        },
        {
          id: 3,
          name: 'CSS世界',
          author: '张鑫旭'
        }
      ]
    })
    ctx.type = 'html'
    ctx.status = 200
    if (ctx.header['x-pjax']) { // 切页局部加载
      const $ = cheerio.load(html)
      const htmlResult = $('#books-list-content').html() // innerHTML
      ctx.res.write(htmlResult)
      const jsResult = $.html('.lazyload-js') // outerHTML
      // ctx.body = htmlResult + jsResult
      ctx.res.write(jsResult)
      ctx.res.end()
    } else { // 刷新全量加载
      // ctx.body = html

      // ctx.res.write(html)
      // ctx.res.end()

      await createSSRStreamPromise(ctx, html)
    }
  }
}