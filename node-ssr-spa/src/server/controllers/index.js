import IndexController from './IndexController'
import BooksController from './BooksController'
import BigpipeController from './BigpipeController'

const indexController = new IndexController()
const booksController = new BooksController()
const bigpipeController = new BigpipeController()

export default (router) => {
  router.get('/', indexController.actionIndex)
  router.get('/books/index', booksController.actionIndex)
  router.get('/books/list', booksController.actionList)
  router.get('/books/create', booksController.actionCreate)
  router.get('/bigpipe1', bigpipeController.actionBigpipe1)
  router.get('/bigpipe2', bigpipeController.actionBigpipe2)
  router.get('/bigpipe3', bigpipeController.actionBigpipe3)
}
