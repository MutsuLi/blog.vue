// import { contentApi, contentrankApi } from 'api'
import * as TYPE from '../actionType/contentType';
import * as contentApi from '../../api/index';


const state = {
    tag: []

}

const getters = {
    tag: state => state.tag,
}

const actions = {
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
    },
    async postTag({ commit, state, rootState }, params) {
        rootState.requesting = true;
        commit(TYPE.TAG_POST_REQUEST);
        let requestParams = {
            tName: params.name,
            tDispalyName: params.displayName,
            tDescription: params.description,
            tsubmitter: params.submitter,
            tsubmitterId: params.submitterId,
        }
        await contentApi.tagApi.post(requestParams).then((res) => {
            rootState.requesting = false;
            commit(TYPE.TAG_POST_SUCCESS, res.response);
        }, (error) => {
            console.log(error);
            rootState.requesting = false;
            commit(TYPE.TAG_POST_FAILURE);
        })
    }
}

const mutations = {
    [TYPE.TAG_LIST_REQUEST](state) {
    },
    [TYPE.TAG_LIST_SUCCESS](state, response) {
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
    }, [TYPE.TAG_POST_REQUEST](state) {

    }, [TYPE.TAG_POST_SUCCESS](state, response) {

    }, [TYPE.TAG_POST_FAILURE](state, error) {
        console.log(error);
        return error;;
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}