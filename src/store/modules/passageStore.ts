// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'




const state = {
    // 默认排序
    // sortKeys: ['douga', 'bangumi', 'music', 'dance', 'game', 'technology', 'life', 'kichiku', 'fashion', 'ad', 'ent', 'movie', 'teleplay'],
    // sortIds: [1, 13, 3, 129, 4, 36, 160, 119, 155, 165, 5, 23, 11],
    // sortValues: ['动画', '番剧', '音乐', '舞蹈', '游戏', '科技', '生活', '鬼畜', '时尚', '广告', '娱乐', '电影', 'TV剧'],
    passages: [],
    passage: {},
    ranks: [],
    tags: []

}

const getters = {
    passages: state => state.passages,
    passage: state => state.passage,
    ranks: state => state.ranks,
    tags: state => state.tags,
    // sortKeys: state => state.sortKeys,
    // sortIds: state => state.sortIds,
}

const actions = {
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
        console.log(categoryId)
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
        const categories: category[] = []
        let hashMap = new Set();
        for (const article of state.Passages) {
            if ((typeof (article.bcategory) == "undefined") || article.bcategory == "") continue;
            if (hashMap.has(article.bcategory)) continue;
            hashMap.add(article.bcategory);
            const text = article.bcategory;
            console.log(categories);
            categories.push({
                text,
                href: '',
            })
        }
        commit(TYPE.CONTENT_SUCCESS, categories)
    }
}

const mutations = {
    [TYPE.CONTENT_REQUEST](state) {

    },
    [TYPE.CONTENT_SUCCESS](state, response) {
        let list = response.data;
        for (let i = 0; i < list.length; i++) {
            let passage = list[i]
            let rowItem = {
                category: passage.bcategory,
                //categoryId: state.sortIds[i],
                title: passage.btitle,
                previousID: passage.previousID,
                previous: passage.previous,
                nextID: passage.nextID,
                next: passage.next,
                bCreateTime: passage.bCreateTime,
                bUpdateTime: passage.bUpdateTime,
                bsubmitter: passage.bsubmitter
            }
            state.rows.push(rowItem)
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
        state.ranks.push(response.data.sort().slice(4, 9))
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