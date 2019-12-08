import config from "../config";
import fetch from "node-fetch";
// import axios from 'axios';
class SafeRequest {
	constructor(url) {
		this.url = url;
		this.baseUrl = config.baseUrl;
	}
	fetch() {
		let result = {
			code: 0,
			message: '',
			data: []
		}
		return new Promise((resolve, reject) => {
			let myfetch = fetch(this.baseUrl + this.url);
			console.log("🍊🍊🍊🍊🍊", this.baseUrl + this.url);
			myfetch
				.then(res => res.json())
				.then((json) => {
					console.log("🍊🍊🍊🍊🍊fetch success:", json)
					result.data = json;
					resolve(result);
				}).catch((error) => {
					console.log("🍊🍊🍊🍊🍊fetch error:", error);
					result.code = 1;
					result.message = "❎node-fetch请求数据失败";
					result.error = error
					reject(result)
				})
		})
	}

	// fetch() {
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
export default SafeRequest;