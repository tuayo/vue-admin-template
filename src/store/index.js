import { createStore } from 'vuex'
import getters from './getters'

import permission from './modules/permission'
import user from './modules/user'

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
  },
  modules: {
    permission,
    user
  },
  getters
})
