// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'


// douga 动画 1
// bangumi 番剧 13
// music 音乐 3
// dance 舞蹈 129
// game 游戏 4
// technology  科技 36
// life 生活 160
// kichiku 鬼畜 119
// fashion 时尚 155
// ad 广告 165
// ent  娱乐 5
// movie 电影 23
// teleplay TV剧 11


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
        commit(TYPE.CONTENT_REQUEST)
        rootState.requesting = false
        let response = require('@/data/Passages.json');
        commit(TYPE.CONTENT_SUCCESS, response)
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
    }
}

// 1  douga 动画
// 2  bangumi 番剧
// 3  music 音乐
// 4  dance 舞蹈
// 5  game 游戏
// 6  technology  科技
// 7  life 生活
// 8  kichiku 鬼畜
// 9  fashion 时尚
// 10 ad 广告
// 11 ent  娱乐
// 12 movie 电影
// 13 teleplay TV剧
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

    }
}

export default {
    state,
    getters,
    actions,
    mutations
}