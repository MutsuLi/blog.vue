import * as url from './urlConfig'
import * as http from './http'
import axios from 'axios'

export const blogsApi = {
	list() {
		let option = {
			url: url.blogs,
			baseURL: "/api/",
			withCredentials: false
		}
		return axios.get(url.blogs, option).then((response) => {
			return response.data;
		})
		// return http.default.get(url.blogs, null, null).then((response) => {
		// 	return response.data;
		// })
	},
	detail(params) {
		let option = {
			baseURL: "/api/",
			withCredentials: false,
			headers: { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token }
		}
		return axios.get(url.blogs + '/' + params.bID, option).then((response) => {
			return response.data;
		});
	}
}

export const loginApi = {
	getToken(params) {
		let option = {
			url: url.getToken,
			baseURL: "/api/",
			params,
			withCredentials: false
		}
		return axios.get(url.getToken, option).then((response) => {
			return response.data;
		});
	},
	refreshToken(params) {
		return axios.get(url.refreshToken, params).then((response) => {
			return response.data;
		});
	}
}

export const userApi = {
	info(params) {
		let option = {
			url: url.user,
			baseURL: "/api/",
			params,
			withCredentials: false
		}
		// let headers = { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token };
		return axios.get(url.user, option).then((response) => {
			return response.data;
		});
	}
}

