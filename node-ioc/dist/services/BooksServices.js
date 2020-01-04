"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

// import SafeRequest from '../utils/safeFetch'
class BooksServices {
  constructor() {}

  getData(options) {
    // const safeFetch = new SafeRequest(options.url)
    // return safeFetch.fetch()
    return new Promise(resolve => {
      resolve({
        data: {
          data: 'JavaScript高级程序设计'
        }
      });
    });
  }

}

exports.default = BooksServices;