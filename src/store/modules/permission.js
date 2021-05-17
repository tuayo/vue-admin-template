import { asyncRoutes, constantRoutes } from '@/router'

/**
 * Use meta.role to determine if the current user has permission
 * @param roles
 * @param route
 */
function hasPermission (roles, route) {
  if (route.role) {
    return roles.some(function (role) {
      if (role) {
        // return route.role.includes(role)
        // 源码用使用的是字符串的includes()方法
        // 当权限字段出现包含关系的时候会出现判断不准确的情况
        // 例如根路由权限为saleres 子路由权限为saleres-call
        // 此时获取了saleres权限则获取了子路由权限
        return route.role === role
      } else {
        return false
      }
    })
  } else {
    return true
  }
}

/**
 * Filter asynchronous routing tables by recursion
 * @param routes asyncRoutes
 * @param roles
 */
export function filterAsyncRoutes (routes, roles) {
  const res = []
  routes.forEach(route => {
    const tmp = { ...route }
    if (hasPermission(roles, tmp)) {
      if (tmp.children) {
        tmp.children = filterAsyncRoutes(tmp.children, roles)
      }
      res.push(tmp)
    }
  })
  return res
}

const state = {
  routes: [],
  addRoutes: []
}

const mutations = {
  SET_ROUTES: (state, routes) => {
    state.addRoutes = routes
    state.routes = constantRoutes.concat(routes)
  }
}

const actions = {
  generateRoutes ({ commit }, roles) {
    // TODO:获取路由
    // const userInfo = getUserInfo()
    return new Promise(resolve => {
      let accessedRoutes = []
      // roles.includes('root')
      // 初始化使用 权限创建完成之后可以去掉
      accessedRoutes = asyncRoutes || []
      // accessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      commit('SET_ROUTES', accessedRoutes)
      resolve(accessedRoutes)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
