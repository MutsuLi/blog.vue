import * as url from './urlConfig';
import * as http from './http';

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
	},
	rank(params) {
		return http.default.get(url.blogs.rank, { params }).then((response) => {
			return response.data;
		})
	},
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
	}, update(params) {
		return http.default.put(url.user.update, params, {}).then((response) => {
			return response.data;
		});
	}
}

export const tagApi = {
	list(params) {
		return http.default.get(url.tag.list, { params }).then((response) => {
			return response.data;
		});
	},
	post(params) {
		return http.default.post(url.tag.post, params, {}).then((response) => {
			return response.data;
		})
	}
}
