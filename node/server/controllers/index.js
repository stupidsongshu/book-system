import IndexController from './IndexController'
import BooksController from './BooksController'

const indexController = new IndexController()
const booksController = new BooksController()

export default (router) => {
  router.get('/', indexController.actionIndex)
  router.get('/book/list', booksController.actionList)
}
