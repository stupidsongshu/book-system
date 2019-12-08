import SafeRequest from '../utils/safeFetch'

export default class Books {
  constructor() {}
  getData(options) {
    const safeFetch = new SafeRequest(options.url)
    return safeFetch.fetch()
  }
}
