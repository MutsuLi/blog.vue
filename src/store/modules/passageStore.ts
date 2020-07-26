import * as TYPE from '../actionType/contentType'


const state = {
    articles: [],
    ranks: [],
    tags: [],
    menus: []

}

const getters = {
    articles: state => state.articles,
    ranks: state => state.ranks,
    tags: state => state.tags,
    menus: state => state.menus
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
    getContentRows({ commit, state, rootState }) {
        rootState.requesting = true
        commit(TYPE.CONTENT_REQUEST)
        rootState.requesting = false
        let response = require('@/data/articles.json');
        commit(TYPE.CONTENT_SUCCESS, response)
        // contentApi.content().then((response) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_SUCCESS, response)
        // }, (error) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_FAILURE)
        // })
    },
    getContentRank({ commit, state, rootState }, categoryId) {
        rootState.requesting = true
        commit(TYPE.CONTENT_RANK_REQUEST)
        rootState.requesting = false
        let response = require('@/data/articles.json');
        commit(TYPE.CONTENT_RANK_SUCCESS, response)
        // commit(TYPE.CONTENT_RANK_REQUEST)
        // let param = {
        //     categoryId: categoryId
        // }
        // contentrankApi.contentrank(param).then((response) => {
        //     rootState.requesting = false
        //     if (categoryId === 1) {
        //         console.log(response)
        //     }
        //     commit(TYPE.CONTENT_RANK_SUCCESS, response)
        // }, (error) => {
        //     rootState.requesting = false
        //     commit(TYPE.CONTENT_RANK_FAILURE)
        // })
    }, getContentTags({ commit, state, rootState }) {
        rootState.requesting = true
        commit(TYPE.CONTENT_RANK_REQUEST)
        rootState.requesting = false
        let articles = require('@/data/articles.json').data;
        let categories: category[] = []
        let hashMap = new Set();
        const defaultArr: category[] = [{
            text: "dotnet",
            href: '',
        }, {
            text: "database",
            href: '',
        }];
        for (const article of articles) {
            if ((typeof (article.bcategory) == "undefined") || article.bcategory == "") continue;
            if (hashMap.has(article.bcategory)) continue;
            hashMap.add(article.bcategory);
            const text = article.bcategory;
            categories.push({
                text,
                href: '',
            })
        }
        categories = categories.concat(defaultArr)
        commit(TYPE.CONTENT_TAGS_SUCCESS, categories)
    }
}

const mutations = {
    [TYPE.MENU_REQUEST](state) {

    },
    [TYPE.MENU_SUCCESS](state, response) {
        state.menus = response;
    },
    [TYPE.CONTENT_REQUEST](state) {

    },
    [TYPE.CONTENT_SUCCESS](state, response) {
        let list = response.data;
        for (let i = 0; i < list.length; i++) {
            let article = list[i]
            let rowItem = {
                ID: article.bID,
                category: article.bcategory,
                title: article.btitle,
                content: article.bcontent,
                createTime: article.bCreateTime,
                updateTime: article.bUpdateTime,
                submitter: article.bsubmitter,
                remark: article.bRemark,
                href: "/articles/" + article.bID,
                traffic: article.btraffic
            }
            state.articles.push(rowItem)
        }
        // for(let key of state.sortKeys) {
        // 	// console.log(JSON.stringify(Object.values(response[key])))
        // 	let rowItem = {
        // 		categoty: 0,
        // 		key: response[key],
        // 		data: Object.values(response[key])
        // 	}
        // 	// state.rows.push(rowItem)
        // 	state.rows.push(Object.values(response[key]))
        // }
    },
    [TYPE.CONTENT_FAILURE](state) {

    },
    // 排行榜信息
    [TYPE.CONTENT_RANK_REQUEST](state) {

    },
    [TYPE.CONTENT_RANK_SUCCESS](state, response) {
        state.ranks = response.data.sort().slice(3, 6);
    },
    [TYPE.CONTENT_RANK_FAILURE](state) {

    },
    // 标签信息
    [TYPE.CONTENT_TAGS_SUCCESS](state, response) {
        state.tags = response;
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}