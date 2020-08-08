import * as TYPE from '../actionType/contentType'
import * as contentApi from '../../api/index'

const state = {
    articles: {
        totalPage: 0,
        totalCount: 0,
        list: []
    },
    articleSearch: [{ text: "", value: "" }],
    ranks: [],
    tags: [],
    menus: []
}

const getters = {
    articles: state => state.articles,
    ranks: state => state.ranks,
    tags: state => state.tags,
    menus: state => state.menus,
    articleSearch: state => state.articleSearch
    // sortKeys: state => state.sortKeys,
    // sortIds: state => state.sortIds,
}

const actions = {
    getMenuList({ commit, state, rootState }) {
        rootState.requesting = true
        commit(TYPE.MENU_REQUEST)
        rootState.requesting = false
        let response = require('@/data/menu.json').data;
        commit(TYPE.MENU_SUCCESS, response)
        // contentApi.content().then((response) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_SUCCESS, response)
        // }, (error) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_FAILURE)
        // })
    },
    getContentRows({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.ARTICLES_REQUEST);
        contentApi.blogsApi.list(params).then((res) => {
            rootState.requesting = false;
            commit(TYPE.ARTICLES_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.ARTICLES_FAILURE);
        })
    },
    getSearchRows({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.ARTICLES_SEARCH_REQUEST);
        contentApi.blogsApi.list(params).then((res) => {
            rootState.requesting = false;
            commit(TYPE.ARTICLES_SEARCH_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.ARTICLES_SEARCH_FAILURE);
        })
    }
    // getContentRank({ commit, state, rootState }, categoryId) {
    //     rootState.requesting = true
    //     commit(TYPE.CONTENT_RANK_REQUEST)
    //     rootState.requesting = false
    //     let response = require('@/data/articles.json');
    //     commit(TYPE.CONTENT_RANK_SUCCESS, response)
    //     // commit(TYPE.CONTENT_RANK_REQUEST)
    //     // let param = {
    //     //     categoryId: categoryId
    //     // }
    //     // contentrankApi.contentrank(param).then((response) => {
    //     //     rootState.requesting = false
    //     //     if (categoryId === 1) {
    //     //         console.log(response)
    //     //     }
    //     //     commit(TYPE.CONTENT_RANK_SUCCESS, response)
    //     // }, (error) => {
    //     //     rootState.requesting = false
    //     //     commit(TYPE.CONTENT_RANK_FAILURE)
    //     // })
    // }
    // , getContentTags({ commit, state, rootState }) {
    //     rootState.requesting = true
    //     commit(TYPE.CONTENT_RANK_REQUEST)
    //     rootState.requesting = false
    //     let articles = require('@/data/articles.json').data;
    //     let categories: category[] = []
    //     let hashMap = new Set();
    //     const defaultArr: category[] = [{
    //         text: "dotnet",
    //         href: '',
    //     }, {
    //         text: "database",
    //         href: '',
    //     }];
    //     for (const article of articles) {
    //         if ((typeof (article.bcategory) == "undefined") || article.bcategory == "") continue;
    //         if (hashMap.has(article.bcategory)) continue;
    //         hashMap.add(article.bcategory);
    //         const text = article.bcategory;
    //         categories.push({
    //             text,
    //             href: '',
    //         })
    //     }
    //     categories = categories.concat(defaultArr)
    //     commit(TYPE.CONTENT_TAGS_SUCCESS, categories)
    // }
}

const mutations = {
    [TYPE.MENU_REQUEST](state) {

    },
    [TYPE.MENU_SUCCESS](state, response) {
        state.menus = response;
    },
    [TYPE.ARTICLES_REQUEST](state) {

    },
    [TYPE.ARTICLES_SUCCESS](state, response) {
        let list = response.data;
        let data = [];
        for (let i = 0; i < list.length; i++) {
            let article = list[i]
            let rowItem = {
                ID: article.bId,
                category: article.bcategory,
                title: article.btitle,
                content: article.bcontent,
                createTime: article.bCreateTime,
                updateTime: article.bUpdateTime,
                submitter: article.bsubmitter,
                remark: article.bRemark,
                href: "/articles/" + article.bId,
                traffic: article.btraffic
            }
            data.push(rowItem)
        }
        state.articles.list = data;
        state.articles.totalCount = response.dataCount;
        state.articles.totalPage = response.pageCount;
    },
    [TYPE.ARTICLES_FAILURE](state) {

    }, [TYPE.ARTICLES_SEARCH_REQUEST](state) {

    },
    [TYPE.ARTICLES_SEARCH_SUCCESS](state, response) {
        let list = response.data;
        let data = [];
        for (let i = 0; i < list.length; i++) {
            let article = list[i]
            let rowItem = {
                text: article.btitle,
                value: "/articles/" + article.bId,
            }
            data.push(rowItem)
        }
        state.articleSearch = data;
    },
    [TYPE.ARTICLES_SEARCH_FAILURE](state) {

    },
    // 排行榜信息
    [TYPE.CONTENT_RANK_REQUEST](state) {

    },
    [TYPE.CONTENT_RANK_SUCCESS](state, response) {
        state.ranks = response.data.sort().slice(3, 6);
    },
    [TYPE.CONTENT_RANK_FAILURE](state) {

    },
    // // 标签信息
    // [TYPE.CONTENT_TAGS_SUCCESS](state, response) {
    //     state.tags = response;
    // }
}

export default {
    state,
    getters,
    actions,
    mutations
}