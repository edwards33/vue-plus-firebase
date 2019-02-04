import Vue from 'vue'
import Vuex from 'vuex'
import AuthModule from '../store-modules/auth'
import DbModule from '../store-modules/db'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    AuthModule,
    DbModule,
  }
})
