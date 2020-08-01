import * as TYPE from '../actionType/contentType';
import * as contentApi from '../../api';
import { getToken, setToken, removeToken } from '@/util/auth'

const state = {
    user: {},
    token: getToken()
}

const getters = {
    user: state => state.user,
    token: state => state.token
}

const actions = {
    getUserInfo({ commit, state, rootState }, params) {
        console.log("getUserInfo");
        rootState.requesting = true;
        commit(TYPE.USERINFO_REQUEST);
        let requestParams = { token: state.token };
        contentApi.userApi.info(requestParams).then((res) => {
            console.log(JSON.stringify(res));
            rootState.requesting = false;
            commit(TYPE.USERINFO_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.USERINFO_FAILURE);
        })
    },
    getToken({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.TOKEN_REQUEST);
        let requestParams = { name: params.userid, pass: params.password };
        contentApi.loginApi.getToken(requestParams).then((res) => {
            rootState.requesting = false;
            commit(TYPE.TOKEN_SUCCESS, res.response)
        }, (error) => {
            console.log(error);
            rootState.requesting = false
            commit(TYPE.TOKEN_FAILURE)
        })
    },
    refreshToken({ commit, state, rootState }) {
        rootState.requesting = true;
        commit(TYPE.REFRESH_TOKEN_REQUEST);
        let params = { token: state.token };
        contentApi.loginApi.refreshToken(params).then((response) => {
            rootState.requesting = false;
            commit(TYPE.REFRESH_TOKEN_SUCCESS, response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false
            commit(TYPE.REFRESH_TOKEN_FAILURE)
        })
    },
    logout({ commit, state, rootState }) {
        rootState.requesting = true;
        commit('SET_TOKEN', this.token);
        commit('SET_USER', this.user);
    },
}

const mutations = {
    SET_TOKEN(state, token) {
        state.token = token
    },
    SET_USER(state, user) {
        state.user = user
    },
    [TYPE.USERINFO_REQUEST](state) {

    },
    [TYPE.USERINFO_SUCCESS](state, res) {
        console.log("res:\r\n" + JSON.stringify(res));
        let user = {
            uId: res.uID,
            userid: res.uLoginName,
            username: res.uRealName,
            name: res.name,
            gender: res.gender,
            age: res.age,
            status: res.uStatus,
            remark: res.uRemark,
            createTime: res.uCreateTime,
            updateTime: res.uUpdateTime,
        };
        state.user = user;

    }, [TYPE.USERINFO_FAILURE](state, response) {

    },
    [TYPE.TOKEN_REQUEST](state) {

    },
    [TYPE.TOKEN_SUCCESS](state, res) {
        setToken(res.token);
    }, [TYPE.TOKEN_FAILURE](state, response) {

    },
    [TYPE.REFRESH_TOKEN_REQUEST](state) {

    },
    [TYPE.REFRESH_TOKEN_SUCCESS](state, res) {
        setToken(res.token);
    }, [TYPE.REFRESH_TOKEN_FAILURE](state, response) {

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}