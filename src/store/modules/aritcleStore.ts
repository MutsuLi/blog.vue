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
    article: {},
    tag: []

}

const getters = {
    toc: state => state.toc,
    breadcrumbs: state => state.breadcrumbs,
    author: state => state.author,
    passageInfo: state => state.passageInfo,
    article: state => state.article,
    tag: state => state.tag,
    // sortKeys: state => state.sortKeys,
    // sortIds: state => state.sortIds,
}

const actions = {
    async getAritcileDetail({ commit, state, rootState }, params) {
        rootState.requesting = true;
        let requestParams = { token: params.token, bID: params.bID };
        commit(TYPE.ARTICLE_DETAIL_REQUEST);
        await contentApi.blogsApi.detail(requestParams).then((res) => {
            rootState.requesting = false;
            commit(TYPE.ARTICLE_DETAIL_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.ARTICLE_DETAIL_FAILURE);
        })
    },
    async postArticle({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.ARTICLE_POST_REQUEST);
        console.log(params)
        let requestParams = {
            bcontent: params.content,
            bSubmitterId: params.submitterId,
            bsubmitter: params.submitter,
            bcategory: params.tagName,
            bcategoryId: params.tag,
            btitle: params.title
        }
        await contentApi.blogsApi.post(requestParams).then((res) => {
            rootState.requesting = false;
            console.log(res);
            commit(TYPE.ARTICLE_POST_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.ARTICLE_POST_FAILURE);
        })
    },
    async getTagList({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.TAG_LIST_REQUEST);
        await contentApi.tagApi.list(params).then((res) => {
            rootState.requesting = false;
            commit(TYPE.TAG_LIST_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.TAG_LIST_FAILURE);
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
            headings: tagsArr,
            readCount: article.btraffic
        };
        state.article = result;

    }, [TYPE.ARTICLE_DETAIL_FAILURE](state) {

    },
    [TYPE.TAG_LIST_REQUEST](state) {
    },
    [TYPE.TAG_LIST_SUCCESS](state, response) {
        console.log("TAG_LIST_SUCCESS");
        console.log(response);
        let list = response.data;
        let data = [];
        for (let i = 0; i < list.length; i++) {
            let tag = list[i]
            let rowItem = {
                id: tag.tId,
                name: tag.tName,
                displayname: tag.tDispalyName,
                description: tag.tDescription,
                submitter: tag.submitter,
                icon: tag.tIcon,
                modifyTime: tag.tModifyTime,
                createTime: tag.tCreateTime
            };
            data.push(rowItem)
        }
        state.tag = data;
    }, [TYPE.TAG_LIST_FAILURE](state) {
    },
    [TYPE.ARTICLE_POST_REQUEST](state) {

    }, [TYPE.ARTICLE_POST_SUCCESS](state, response) {
        console.log("ARTICLE_POST_SUCCESS");
        console.log(response)

    }, [TYPE.ARTICLE_POST_FAILURE](state) {

    },
}

export default {
    state,
    getters,
    actions,
    mutations
}