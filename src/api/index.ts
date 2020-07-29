import * as url from './urlConfig'
import axios from 'axios'

export const blogsApi = {
	list() {
		return axios.get(url.blogs).then((response) => {
			return response.data;
		})
	},
	info(params) {
		let headers = { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token };
		return axios.get(url.blogs, { params, headers }).then((response) => {
			return response.data;
		})
	}
}

export const loginApi = {
	getToken(params) {
		return axios.get(url.getToken, params).then((response) => {
			return response.data
		})
	},
	refreshToken(params) {
		return axios.get(url.refreshToken, params).then((response) => {
			return response.data
		})
	}
}

export const userApi = {
	user(params) {
		let headers = { "Content-Type": "application/json; charset=utf-8", "Authorization": "Bearer " + params.token };
		return axios.get(url.user, { params, headers }).then((response) => {
			return response.data
		})
	}
}

