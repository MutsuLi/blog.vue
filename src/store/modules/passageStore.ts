// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'




const state = {
    // 默认排序
    // sortKeys: ['douga', 'bangumi', 'music', 'dance', 'game', 'technology', 'life', 'kichiku', 'fashion', 'ad', 'ent', 'movie', 'teleplay'],
    // sortIds: [1, 13, 3, 129, 4, 36, 160, 119, 155, 165, 5, 23, 11],
    // sortValues: ['动画', '番剧', '音乐', '舞蹈', '游戏', '科技', '生活', '鬼畜', '时尚', '广告', '娱乐', '电影', 'TV剧'],
    passages: [],
    ranks: [],
    tags: [],
    menus: []

}

const getters = {
    passages: state => state.passages,
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
        let response = require('@/data/Passages.json');
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
        let response = require('@/data/Passages.json');
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
        let articles = require('@/data/Passages.json').data;
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
            let passage = list[i]
            let rowItem = {
                ID: passage.bID,
                category: passage.bcategory,
                title: passage.btitle,
                content: passage.bcontent,
                createTime: passage.bCreateTime,
                updateTime: passage.bUpdateTime,
                submitter: passage.bsubmitter,
                remark: passage.bRemark,
                href: passage.href
            }
            state.passages.push(rowItem)
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
        console.log(state.ranks)
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