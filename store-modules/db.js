import * as types from './mutation-types';
import * as urls from './url-constants';

import firebase from 'firebase'

const state = {
    messages: '',
}

const getters = {
    messages: state => {
        return state.messages
    },
}

const actions = {
    messages({
            commit
        },
        db
    ) {
        commit(types.DB.updated, db)
    },
    
}

const mutations = {
    [types.DB.updated](state, db) {
        state.messages = db
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}