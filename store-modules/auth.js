import * as types from './mutation-types';
import * as urls from './url-constants';

import firebase from 'firebase'

const state = {
    loading: false,
    userCreated: false,
    user: '',
    errorMessage: '',
    verify: ''
}

const getters = {
    loading: state => {
        return state.loading
    },
    userCreated: state => {
        return state.userCreated
    },
    errorMessage: state => {
        return state.errorMessage
    },
    user: state => {
        return state.user
    },
    verify: state => {
        return state.verify
    },
}

const actions = {
    verification({
            commit
        }
    ) {
        commit(types.CHANGE_LOADING_STATE, true)
        firebase.auth().currentUser.sendEmailVerification()
            .then(() => {
                commit(types.USER.verify, `sent: ${new Date()}`)


                firebase.auth().signOut()
                    .then(() => {
                        commit(types.CHANGE_LOADING_STATE, false)
                        commit(types.ERROR_MESSAGE, '')
                        commit(types.USER.create, null)
                    }).catch((err) => {
                        commit(types.CHANGE_LOADING_STATE, false)
                        commit(types.ERROR_MESSAGE, err.message)
                    });

            }, (err) => {
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.ERROR_MESSAGE, err.message)
            });

    },
    logIn({
            commit
        }, 
        {
            email, 
            password
        }
    ) {
        commit(types.CHANGE_LOADING_STATE, true)

        firebase.auth().signInWithEmailAndPassword(email, password)
            .then(user => {
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.ERROR_MESSAGE, '')
                commit(types.USER.create, user)
            }).catch((err) => {
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.USER.create, null)
                commit(types.ERROR_MESSAGE, err.message)
            });
    },
    logout({
            commit
        }
    ) {
        commit(types.CHANGE_LOADING_STATE, true)

        firebase.auth().signOut()
            .then(() => {
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.ERROR_MESSAGE, '')
                commit(types.USER.create, null)
            }).catch((err) => {
                commit(types.CHANGE_LOADING_STATE, false)
                commit(types.ERROR_MESSAGE, err.message)
            })
    },
    registerUser({
            commit
        }, 
        {
            email, 
            password
        }
    ) {
        commit(types.CHANGE_LOADING_STATE, true)

        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(
                user => {
                    commit(types.CHANGE_LOADING_STATE, false)
                    commit(types.ERROR_MESSAGE, '')
                    commit(types.USER.create, user)
                },
                err => {
                    commit(types.CHANGE_LOADING_STATE, false)
                    commit(types.USER.create, null)
                    commit(types.ERROR_MESSAGE, err.message)
                }
            )
    },
}

const mutations = {
    [types.USER.verify](state, msg) {
        state.verify = msg
    },
    [types.USER.create](state, user) {
        state.userCreated = true
        state.user = user
    },
    [types.CHANGE_LOADING_STATE](state, loading) {
        state.loading = loading
    },
    [types.ERROR_MESSAGE](state, message) {
        state.errorMessage = message//JSON.stringify(message)
    },
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}