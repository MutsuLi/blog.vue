// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'
import { parseLink } from "@/util/helpers";

//
import marked from "marked";
marked.setOptions({
    breaks: true,
    smartLists: true
});


const state = {
    toc: null,
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
        headings: []
    },
    passage: {}

}

const getters = {
    toc: state => state.toc,
    breadcrumbs: state => state.breadcrumbs,
    author: state => state.author,
    passageInfo: state => state.passageInfo,
    passage: state => state.passage
    // sortKeys: state => state.sortKeys,
    // sortIds: state => state.sortIds,
}

const actions = {
    getContentDetail({ commit, state, rootState }, bID) {
        rootState.requesting = true
        commit(TYPE.CONTENT_RANK_REQUEST)
        rootState.requesting = false
        let passage = require('@/data/detail.json');
        commit(TYPE.CONTENT_PASSAGE_SUCCESS, passage)
    }
}

const mutations = {
    [TYPE.CONTENT_FAILURE](state) {

    },
    [TYPE.CONTENT_PASSAGE_SUCCESS](state, response) {
        const rendererMD = new marked.Renderer();
        const tagsArr: Array<object> = new Array();
        rendererMD.heading = (text, level) => {
            var escapedText = text.toLowerCase().replace(/[^\w]+/g, '-');
            tagsArr.push({ text, subTitle: level > 2 });
            return `<h${level}>
            <a name="${text}" id="${text}" class="anchor" href="#${text}">
            <span class="header-link"></span></a>${text}</h${level}>`;
        };

        let rawHtml = response.bcontent.replace(/\[([^\]]*)\]\(([^)]*)\)/g, parseLink);
        const innerHTML = marked(rawHtml, { renderer: rendererMD });
        let passage = response;
        let result = {
            ID: passage.bID,
            category: passage.bcategory,
            title: passage.btitle,
            content: passage.bcontent,
            contentHtml: innerHTML,
            createTime: passage.bCreateTime,
            updateTime: passage.bUpdateTime,
            submitter: passage.bsubmitter,
            remark: passage.bRemark,
            next: passage.next,
            nextID: passage.nextID,
            previousID: passage.previousID,
            previous: passage.previous,
            headings: tagsArr
        };
        state.passage = result;

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