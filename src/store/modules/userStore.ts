import * as TYPE from '../actionType/contentType';
import * as contentApi from '../../api';


const state = {
    user: {},
    token: []
}

const getters = {
    user: state => state.user,
    token: state => state.token
}

const actions = {
    getUserInfo({ commit, state, rootState }) {
        // rootState.requesting = true;
        // commit(TYPE.USERINFO_REQUEST);
        // rootState.requesting = false;
        // let response = require('@/data/menu.json').data;
        // commit(TYPE.USERINFO_SUCCESS, response);
        // contentApi.loginApi().then((response) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_SUCCESS, response)
        // }, (error) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_FAILURE)
        // })
    },
    getToken({ commit, state, rootState }) {
        rootState.requesting = true;
        commit(TYPE.TOKEN_REQUEST);
        let params = { name: rootState.id, pass: rootState.password };
        contentApi.loginApi.getToken(params).then((response) => {
            rootState.requesting = false;
            console.log(response);
            commit(TYPE.TOKEN_SUCCESS, response)
        }, (error) => {
            console.log(error);
            rootState.requesting = false
            commit(TYPE.TOKEN_FAILURE)
        })
    },
    refreshToken({ commit, state, rootState }) {
        rootState.requesting = true;
        commit(TYPE.REFRESH_TOKEN_REQUEST);
        let params = { name: rootState.id, pass: rootState.password };
        contentApi.loginApi.refreshToken(params).then((response) => {
            rootState.requesting = false;
            console.log(response);
            commit(TYPE.REFRESH_TOKEN_SUCCESS, response)
        }, (error) => {
            console.log(error);
            rootState.requesting = false
            commit(TYPE.REFRESH_TOKEN_FAILURE)
        })
    }
}

const mutations = {

}

export default {
    state,
    getters,
    actions,
    mutations
}