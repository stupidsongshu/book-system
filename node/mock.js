const Koa = require('koa')
const KoaRouter = require('koa-router')

const app = new Koa()
const router = new KoaRouter()

router.get('/', (context, next) => {
  context.body = 'Home'
})
router.get('/book/index', (context, next) => {
  context.body = [
    {
      id: 1,
      name: '红楼梦',
      author: '曹雪芹',
      isbn: 'ksajdah8a7sd8',
      price: 99.0
    },
    {
      id: 2,
      name: '西游记',
      author: '吴承恩',
      isbn: 'sadjajf',
      price: 89.9
    }
  ]
})

app
  .use(router.routes())
  .use(router.allowedMethods())

app.listen(8888, () => {
  console.log('Server is listening on port 8888')
})
