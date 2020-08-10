import * as url from './urlConfig'
import * as http from './http'
import axios from 'axios'

export const blogsApi = {
	list(params) {
		return http.default.get(url.blogs.list, { params }).then((response) => {
			return response.data;
		})
	},
	detail(params) {
		return http.default.get(url.blogs.list + '/' + params.bID, {}).then((response) => {
			return response.data;
		})
	},
	post(params) {
		return http.default.post(url.blogs.post, params, {}).then((response) => {
			return response.data;
		})
	}
}

export const loginApi = {
	getToken(params) {
		return http.default.get(url.getToken, { params }).then((response) => {
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
	},
	register(params) {
		return http.default.post(url.user.register, params, {}).then((response) => {
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
