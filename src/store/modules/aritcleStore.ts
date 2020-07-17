// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'

//
import marked from "marked";
marked.setOptions({
    breaks: true,
    smartLists: true
});


const state = {
    toc: null,
    headings: [],
    breadcrumbs: [],
    author: {
        passagesCount: 10,
        name: "",
        id: 20200715,
        info: ""
    },
    passageInfo: {
        readNum: 100,
        releaseTime: "2020-07-17 16:16:00",
        tags: [],
    },
    passage: {}

}

const getters = {
    headings: state => state.headings,
    toc: state => state.toc,
    breadcrumbs: state => state.breadcrumbs,
    tags: state => state.tags,
    author: state => state.author,
    passageInfo: state => state.passageInfo,
    passage: state => state.passage
    // sortKeys: state => state.sortKeys,
    // sortIds: state => state.sortIds,
}

const actions = {
    getHeadings({ commit, state, rootState }) {
        rootState.requesting = true
        commit(TYPE.MENU_REQUEST)
        rootState.requesting = false
        let passage = state.passage;

    }, getContentDetail({ commit, state, rootState }, bID) {
        console.log(bID)
        rootState.requesting = true
        commit(TYPE.CONTENT_RANK_REQUEST)
        rootState.requesting = false
        let response = require('@/data/detail.json');
        commit(TYPE.CONTENT_PASSAGE_SUCCESS, response)
    }
}

const mutations = {
    [TYPE.CONTENT_FAILURE](state) {

    },
    [TYPE.CONTENT_PASSAGE_SUCCESS](state, response) {
        let passage = response;
        let result = {
            ID: passage.bID,
            category: passage.bcategory,
            title: passage.btitle,
            content: passage.bcontent,
            createTime: passage.bCreateTime,
            updateTime: passage.bUpdateTime,
            submitter: passage.bsubmitter,
            remark: passage.bRemark,
            next: passage.next,
            nextID: passage.nextID,
            previousID: passage.previousID,
            previous: passage.previous
        };
        state.passage = result;
    },
    // 标签信息
    [TYPE.CONTENT_TAGS_SUCCESS](state, response) {
        state.tags = response;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}