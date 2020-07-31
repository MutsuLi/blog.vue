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
    }
}

const mutations = {
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