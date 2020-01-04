// import SafeRequest from '../utils/safeFetch'

export default class BooksServices {
  constructor() {}
  getData(options) {
    // const safeFetch = new SafeRequest(options.url)
    // return safeFetch.fetch()

    return new Promise(resolve => {
      resolve({
        data: {
          data: 'JavaScript高级程序设计'
        }
      })
    })
  }
}
