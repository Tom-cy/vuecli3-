import { asyncRoutes, constantRoutes } from '@/router'

// hasPermission函数
/**
 * 使用meta.role 确定当前用户是否具有权限
 * @param {*} roles
 * @param {*} route
 */
function hasPermission(roles, route) {
  if (route.meta && route.meta.roles) {
    return roles.some(role => route.meta.roles.includes(role))
  } else {
    return true
  }
}

/**
 *按递归帅选异步路由表
 * @param {*} routes
 * @param {*} roles
 */

// filterAsyncRoutes函数
export function filterAsyncRoutes(routes, roles) {
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

const actions = {
  generateRoutes({ commit }, roles) {
    return new Promise(resolve => {
      let assessedRoutes
      if (roles.includes('admin')) {
        // 加载动态路由
        assessedRoutes = asyncRoutes || []
      } else {
        assessedRoutes = filterAsyncRoutes(asyncRoutes, roles)
      }
      commit('SET_ROUTES', assessedRoutes)
      resolve(assessedRoutes)
    })
  }
}
const mutations = {
  SET_ROUTES: (state, routes) => {
    state.routes = routes
    state.addRoutes = constantRoutes.concat(routes)
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
