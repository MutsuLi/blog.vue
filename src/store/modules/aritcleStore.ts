// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'
import { parseLink } from "@/util/helpers";
import * as contentApi from '../../api/index'

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
    article: {}

}

const getters = {
    toc: state => state.toc,
    breadcrumbs: state => state.breadcrumbs,
    author: state => state.author,
    passageInfo: state => state.passageInfo,
    article: state => state.article
    // sortKeys: state => state.sortKeys,
    // sortIds: state => state.sortIds,
}

const actions = {
    getAritcileDetail({ commit, state, rootState }, params) {
        rootState.requesting = true;
        let requestParams = { token: params.token, bID: params.bID };
        commit(TYPE.ARTICLE_DETAIL_REQUEST);
        contentApi.blogsApi.detail(requestParams).then((res) => {
            rootState.requesting = false;
            console.log("TYPE.ARTICLE_DETAIL_SUCCESS");
            commit(TYPE.ARTICLE_DETAIL_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.ARTICLE_DETAIL_FAILURE);
        })
    }
}

const mutations = {
    [TYPE.ARTICLE_DETAIL_REQUEST](state) {

    },
    [TYPE.ARTICLE_DETAIL_SUCCESS](state, response) {
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
        let article = response;
        let result = {
            ID: article.bID,
            category: article.bcategory,
            title: article.btitle,
            content: article.bcontent,
            contentHtml: innerHTML,
            createTime: article.bCreateTime,
            updateTime: article.bUpdateTime,
            submitter: article.bsubmitter,
            remark: article.bRemark,
            next: article.next,
            nextID: article.nextID,
            previousID: article.previousID,
            previous: article.previous,
            headings: tagsArr
        };
        state.article = result;

    }, [TYPE.ARTICLE_DETAIL_FAILURE](state) {

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