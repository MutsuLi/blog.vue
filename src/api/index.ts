import * as url from './urlConfig'
import * as http from './http'
import axios from 'axios'

export const blogsApi = {
	list(params) {
		// let option = {
		// 	baseURL: "/api/",
		// 	withCredentials: false,
		// 	params
		// }
		// return axios.get(url.blogs.list, option).then((response) => {
		// 	return response.data;
		// })
		return http.default.get(url.blogs.list, { params }).then((response) => {
			console.log("list.get")
			console.log(response)
			return response.data;
		})
	},
	detail(params) {
		// let option = {
		// 	baseURL: "/api/",
		// 	withCredentials: false,
		// 	headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token }
		// }
		// return axios.get(url.blogs.list + '/' + params.bID, option).then((response) => {
		// 	return response.data;
		// });

		return http.default.get(url.blogs.list + '/' + params.bID, {}).then((response) => {
			console.log("detail.get")
			console.log(response)
			return response.data;
		})
	},
	post(params) {
		// let option = {
		// 	baseURL: "/apis/",
		// 	withCredentials: false,
		// 	headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token },
		// }
		return http.default.post(url.blogs.post, params, {}).then((response) => {
			console.log(response);
			return response.data;
		})
	}
}

export const loginApi = {
	getToken(params) {
		// let option = {
		// 	baseURL: "/api/",
		// 	params,
		// 	withCredentials: false
		// }
		console.log("getToken")
		return http.default.get(url.getToken, { params }).then((response) => {
			console.log(response)
			return response.data;
		});
	},
	refreshToken(params) {
		return http.default.get(url.refreshToken, { params }).then((response) => {
			return response.data;
		});
	}
}

export const userApi = {
	infoByToken(params) {
		return http.default.get(url.user.infoByToken, { params }).then((response) => {
			return response.data;
		});
	},
	infoById(params) {
		return http.default.get(url.user.infoById + '/' + params.uId, {}).then((response) => {
			return response.data;
		});
	}
}

export const tagApi = {
	list(params) {
		// let option = {
		// 	baseURL: "/api/",
		// 	params,
		// 	withCredentials: false
		// }
		// let headers = { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token };
		return http.default.get(url.tag.list, {}).then((response) => {
			return response.data;
		});
	}
}
