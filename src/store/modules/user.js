import {
  setUserInfo,
  getUserInfo,
  setToken,
  removeUserInfo,
  removeToken
} from '@/utils/auth'

const state = {
  name: '',
  avatar: '',
  roles: [],
  userInfo: {},
}

const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  SET_ROLES: (state, roles) => {
    state.roles = roles
  },
  SET_USERINFO: (state, userInfo) => {
    state.userInfo = userInfo
  }
}

const actions = {
  // user login
  async login ({ commit }, userInfo) {
    const { username, password } = userInfo
    // login api
    // const data = await login(username.trim(), password)

    // moke data
    const data = {
      userInfo: {
        username: 'test',
        nickname: 'test'
      },
      token: 'token-1234567890'
    }
    const user = data.userInfo
    const token = data.token
    setUserInfo(user)
    setToken(token)
    return Promise.resolve(user)
  },

  // get user info
  getInfo ({ commit, state }) {
    return new Promise((resolve, reject) => {
      const data = getUserInfo()
      const menu = data.roles || []
      const roles = menu.map(r => {
        return r.role
      })
      // if (process.env.VUE_APP_MODE !== 'production') {
      //   // 分配root权限 获取所有动态路由
      //   roles.push('root')
      // }
      roles.push('root')
      if (roles.length === 0) {
        // 如果还未给角色分配任何权限 则默认分配一个
        // 此权限只有默认首页
        roles.push('default')
      }
      const username = data.username
      commit('SET_ROLES', roles)
      commit('SET_NAME', username)
      resolve(data)
    })
  },

  // user logout
  logout ({ commit, state, dispatch }) {
    return new Promise((resolve, reject) => {
      // ============
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeUserInfo()
      removeToken()
      // resetRouter()

      // reset visited views and cached views
      // to fixed https://github.com/PanJiaChen/vue-element-admin/issues/2485
      dispatch('tagsView/delAllViews', null, { root: true })

      return resolve()
    })
  },

  // remove token
  resetToken ({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      removeUserInfo()

      resolve()
    })
  }

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
