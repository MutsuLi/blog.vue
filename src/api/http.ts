import store from '@/store/index';
import axios from 'axios'
// import applicationUserManager from "../Auth/applicationusermanager";
import router from '../router';
import { removeToken, getToken } from '@/util/auth'

// 配置API接口地址
var root = "/api/";//用proxy实现本地代理跨域（生产环境使用的是nginx）
const instance = axios.create({
    baseURL: root,
    headers: { "Content-Type": "application/json; charset=utf-8" },
    withCredentials: false
})

// 自定义判断元素类型JS
function toType(obj) {
    return {}.toString
        .call(obj)
        .match(/\s([a-zA-Z]+)/)[1]
        .toLowerCase();
}
// 参数过滤函数
function filterNull(o) {
    for (var key in o) {
        if (o[key] === null) {
            delete o[key];
        }
        if (toType(o[key]) === "string") {
            o[key] = o[key].trim();
        } else if (toType(o[key]) === "object") {
            o[key] = filterNull(o[key]);
        } else if (toType(o[key]) === "array") {
            o[key] = filterNull(o[key]);
        }
    }
    return o;
}

// http request 拦截器
instance.interceptors.request.use(
    config => {
        if (getToken()) {
            // 判断是否存在token，如果存在的话，则每个http header都加上token
            console.log(config.headers)
            config.headers.Authorization = "Bearer " + getToken();
        }
        return config;
    },
    err => {
        return Promise.reject(err);
    }
);
// http response 拦截器
instance.interceptors.response.use(
    response => {
        return response;
    },
    error => {
        if (error.response) {
            switch (error.response.status) {
                case 401:
                    // // 返回 401 清除token信息并跳转到登录页面
                    store.dispatch('resetToken').then(() => {
                        router.replace({
                            path: "/login",
                            query: { redirect: router.currentRoute.fullPath }
                        });
                    })
            }
        }
        return Promise.reject(error.response.data); // 返回接口返回的错误信息
    }
);
/*
  接口处理函数
  这个函数每个项目都是不一样的，我现在调整的是适用于
  https://cnodejs.org/api/v1 的接口，如果是其他接口
  需要根据接口的参数进行调整。参考说明文档地址：
  https://cnodejs.org/topic/5378720ed6e2d16149fa16bd
  主要是，不同的接口的成功标识和失败提示是不一致的。
  另外，不同的项目的处理方法也是不一致的，这里出错就是简单的alert
*/

function apiAxios() {
    return axios.create({
        baseURL: root,
        // `headers` 是即将被发送的自定义请求头
        withCredentials: false
    })
}

// 返回在vue模板中的调用接口
export default {
    get: function (url, params) {
        if (params) {
            params = filterNull(params);
        }
        return instance.get(url, {
            data: null,
            params: params,
            //headers
        }).then();
    },
    post: function (url, params) {
        if (params) {
            params = filterNull(params);
        }
        return instance.post(url, {
            data: params,
            parms: null,
            //headers
        })
    },
    put: function (url, params) {
        if (params) {
            params = filterNull(params);
        }
        return instance.put(url, {
            data: params,
            parms: null,
            // headers
        })
    },
    delete: function (url, params) {
        if (params) {
            params = filterNull(params);
        }
        return apiAxios().delete(url, {
            data: null,
            params,
            // headers
        })
    },
};