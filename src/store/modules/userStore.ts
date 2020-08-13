import * as TYPE from '../actionType/contentType';
import * as contentApi from '../../api';
import * as model from '../dataModel/model';
import { getToken, setToken, removeToken } from '@/util/auth'

const state = {
    user: {
        uId: "",
        userid: "",
        username: "",
        title: "",
        description: "",
        name: "",
        gender: "",
        age: "",
        status: "",
        remark: "",
        createTime: "",
        updateTime: "",
    },
    token: getToken(),
    author: {}
}

const getters = {
    user: state => state.user,
    token: state => state.token,
    author: state => state.author,
}

const actions = {
    async getUserInfo({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.USERINFO_REQUEST);
        let requestParams = { token: state.token };
        await contentApi.userApi.infoByToken(requestParams).then((res) => {
            rootState.requesting = false;
            if (!res.success) return commit(TYPE.USERINFO_FAILURE, new model.user());
            return commit(TYPE.USERINFO_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            return commit(TYPE.USERINFO_FAILURE);
        })
    }, async getUserInfoById({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.AUTHOR_REQUEST);
        await contentApi.userApi.infoById(params).then((res) => {
            rootState.requesting = false;
            if (!res.success) return commit(TYPE.AUTHOR_FAILURE, new model.user());
            return commit(TYPE.AUTHOR_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            return commit(TYPE.AUTHOR_FAILURE);
        })
    },
    async register({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.REGISTER_REQUEST);
        let requestParams = { uEmail: params.userid, uPassword: params.password, uName: params.username };
        await contentApi.userApi.register(requestParams).then((res) => {
            console.log(res);
            rootState.requesting = false;
            return commit(TYPE.REGISTER_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            return commit(TYPE.REGISTER_FAILURE);
        })
    }, async updateUserInfo({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.REGISTER_REQUEST);
        await contentApi.userApi.update(params).then((res) => {
            console.log(res);
            rootState.requesting = false;
            return commit(TYPE.REGISTER_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            return commit(TYPE.REGISTER_FAILURE);
        })
    },
    async getToken({ commit, state, rootState }, params) {
        console.log("before getToken:" + JSON.stringify(state))
        rootState.requesting = true;
        commit(TYPE.TOKEN_REQUEST);
        let requestParams = { name: params.userid, pass: params.password };
        await contentApi.loginApi.getToken(requestParams).then((res) => {
            rootState.requesting = false;
            return commit(TYPE.TOKEN_SUCCESS, res.response)
        }, (error) => {
            console.log(error);
            rootState.requesting = false
            return commit(TYPE.TOKEN_FAILURE)
        })
    },
    async refreshToken({ commit, state, rootState }) {
        rootState.requesting = true;
        commit(TYPE.REFRESH_TOKEN_REQUEST);
        let params = { token: state.token };
        await contentApi.loginApi.refreshToken(params).then((response) => {
            rootState.requesting = false;
            return commit(TYPE.REFRESH_TOKEN_SUCCESS, response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false
            return commit(TYPE.REFRESH_TOKEN_FAILURE)
        })
    },
    async resetToken({ commit, state, rootState }) {
        removeToken();
        commit('SET_TOKEN', "");
        commit('SET_USER', "");
    },
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.user = user
    }, [TYPE.REGISTER_REQUEST](state) {

    },
    [TYPE.REGISTER_SUCCESS](state, res) {
        console.log("TYPE.REGISTER_SUCCESS");
        console.log(res)

    }, [TYPE.REGISTER_FAILURE](state, res) {
        console.log(JSON.stringify(res));
        state.user = res;
    },
    [TYPE.USERINFO_REQUEST](state) {

    },
    [TYPE.USERINFO_SUCCESS](state, res) {
        console.log("TYPE.USERINFO_SUCCESS");
        let user = {
            uId: res.uId,
            userid: res.uEmail,
            username: res.uName,
            title: res.uTitle,
            description: res.uDescription,
            name: res.uName,
            gender: res.gender,
            age: res.age,
            status: res.uStatus,
            remark: res.uRemark,
            createTime: res.uCreateTime,
            updateTime: res.uUpdateTime,
        };
        state.user = user;

    }, [TYPE.USERINFO_FAILURE](state, res) {
        console.log(JSON.stringify(res));
        state.user = res;
    }, [TYPE.USER_UPDATE_REQUEST](state, res) {

    }, [TYPE.USER_UPDATE_SUCCESS](state, res) {

    }, [TYPE.USER_UPDATE_FAILURE](state, res) {

    },
    [TYPE.AUTHOR_REQUEST](state) {

    },
    [TYPE.AUTHOR_SUCCESS](state, res) {
        console.log("TYPE.AUTHOR_SUCCESS");
        let author = {
            uId: res.uId,
            userid: res.uEmail,
            username: res.uName,
            title: res.uTitle,
            description: res.uDescription,
            gender: res.gender,
            age: res.age,
            status: res.uStatus,
            remark: res.uRemark,
            createTime: res.uCreateTime,
            updateTime: res.uUpdateTime,
        };
        state.author = author;

    }, [TYPE.AUTHOR_FAILURE](state, res) {
        console.log(JSON.stringify(res));
        state.author = res;
    },
    [TYPE.TOKEN_REQUEST](state) {

    },
    [TYPE.TOKEN_SUCCESS](state, res) {
        setToken(res.token);
        state.token = res.token;
    }, [TYPE.TOKEN_FAILURE](state, response) {

    },
    [TYPE.REFRESH_TOKEN_REQUEST](state) {

    },
    [TYPE.REFRESH_TOKEN_SUCCESS](state, res) {
        setToken(res.token);
        state.token = res.token;
    }, [TYPE.REFRESH_TOKEN_FAILURE](state, response) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}