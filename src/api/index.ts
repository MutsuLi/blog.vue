import * as url from './urlConfig'
import axios from 'axios'

export const blogsApi = {
	list() {
		return axios.get(url.blogs).then((response) => {
			return response.data;
		})
	},
	info(param) {
		return axios.get(url.blogs, param).then((response) => {
			return response.data;
		})
	}
}

export const loginApi = {
	login(param) {
		return axios.get(url.login, param).then((response) => {
			return response.data
		})
	}
}

export const userApi = {
	user(param) {
		return axios.get(url.user, param).then((response) => {
			return response.data
		})
	}
}

