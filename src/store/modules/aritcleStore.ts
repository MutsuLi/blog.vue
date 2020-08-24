// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType'
import { parseLink } from "@/util/helpers";
import * as contentApi from '../../api/index'
import kebabCase from "lodash/kebabCase";
//
import marked from "marked";
marked.setOptions({
    breaks: true,
    smartLists: true
});


const state = {
    toc: null,
    breadcrumbs: [],
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
    passageInfo: state => state.passageInfo,
    article: state => state.article
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
        let requestParams = {
            bcontent: params.content,
            bsubmitterId: params.submitterId,
            bsubmitter: params.submitter,
            bcategory: params.tagName,
            bcategoryId: params.tag,
            btitle: params.title
        }
        await contentApi.blogsApi.post(requestParams).then((res) => {
            rootState.requesting = false;
            if (res.status != 200) {
                rootState.requesting = false;
                commit(TYPE.ARTICLE_POST_FAILURE, res);
            }
            commit(TYPE.ARTICLE_POST_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.ARTICLE_POST_FAILURE);
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
            tagsArr.push({ text, subTitle: level > 3 });
            return `<h${level}>
            <a name="${text}" id="${kebabCase(text)}" class="anchor" href="#${text}">
            <span class="header-link"></span></a>${text}</h${level}>`;
        };

        let rawHtml = response.bcontent.replace(/\[([^\]]*)\]\(([^)]*)\)/g, parseLink);
        const innerHTML = marked(rawHtml, { renderer: rendererMD });
        let article = response;
        let result = {
            id: article.id,
            category: article.bcategory,
            title: article.btitle,
            content: article.bcontent,
            contentHtml: innerHTML,
            createTime: article.bCreateTime,
            updateTime: article.bUpdateTime,
            uId: article.bsubmitterId,
            uName: article.bsubmitter,
            remark: article.bRemark,
            next: article.next,
            nextID: article.nextID,
            previousID: article.previousID,
            previous: article.previous,
            headings: tagsArr,
            readCount: article.btraffic
        };
        state.article = result;

    }, [TYPE.ARTICLE_DETAIL_FAILURE](state, error) {
        throw error;
    },
    [TYPE.ARTICLE_POST_REQUEST](state) {

    }, [TYPE.ARTICLE_POST_SUCCESS](state, response) {

    }, [TYPE.ARTICLE_POST_FAILURE](state, error) {
        return error;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}