import * as TYPE from '../actionType/contentType';

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
        rootState.requesting = true;
        commit(TYPE.USERINFO_REQUEST);
        rootState.requesting = false;
        let response = require('@/data/menu.json').data;
        commit(TYPE.MENU_SUCCESS, response)
    },
    getToken({ commit, state, rootState }) {

    },
    refreshToken({ commit, state, rootState }) {

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