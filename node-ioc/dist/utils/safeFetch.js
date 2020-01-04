"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _config = _interopRequireDefault(require("../config"));

var _nodeFetch = _interopRequireDefault(require("node-fetch"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// import axios from 'axios';
class SafeRequest {
  constructor(url) {
    this.url = url;
    this.baseUrl = _config.default.baseUrl;
  }

  fetch() {
    let result = {
      code: 0,
      message: '',
      data: []
    };
    return new Promise((resolve, reject) => {
      let myfetch = (0, _nodeFetch.default)(this.baseUrl + this.url);
      console.log("✅", this.baseUrl + this.url);
      myfetch.then(res => res.json()).then(json => {
        console.log("✅fetch success:", json);
        result.data = json;
        resolve(result);
      }).catch(error => {
        console.log("❎fetch error:", error);
        result.code = 1;
        result.message = "❎node-fetch请求数据失败";
        result.data = error;
        reject(result);
      });
    });
  } // fetch() {
  // 	let result = {
  // 		code: 0,
  // 		message: "",
  // 		data: []
  // 	}
  // 	return new Promise((resolve, reject) => {
  // 		axios({
  // 			url: this.baseUrl + this.url,
  // 			method: 'GET',
  // 		}).then(res => {
  // 			console.log('🍊🍊🍊🍊🍊axois success:', res)
  // 			resolve(res)
  // 		}).catch(err => {
  // 			console.log('🍊🍊🍊🍊🍊axois fail:', err)
  // 			reject(err)
  // 		})
  // 	})
  // }


}

var _default = SafeRequest;
exports.default = _default;