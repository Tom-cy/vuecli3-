import { login, getUserInfo } from '@/api/api'
import { Message } from 'element-ui'
import { getToken, setToken, removeToken } from '@/untils/auth'
const state = {
  // 用户的基本数据
  avator: '',
  introduction: '',
  name: '',
  roles: '',
  username: '',
  token: getToken()
}
const actions = {
  login({ commit }, userinfo) {
    const ruleForm = JSON.parse(JSON.stringify(userinfo))
    return new Promise((resolve, reject) => {
      login(ruleForm)
        .then(response => {
          // 显示状态的提示
          if (response.status === 200) {
            if (response.data.error === 1) {
              Message({
                type: 'error',
                message: response.data.data
              })
            } else {
              Message({
                type: 'success',
                message: response.data.data
              })
              commit('SET_TOKEN', response.data.token)
              commit('SET_USERNAME', ruleForm.username)
              setToken(response.data.token)
            }
          }
          resolve()
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  getInfo({ commit, state }) {
    return new Promise((resolve, reject) => {
      getUserInfo({ username: state.username })
        .then(response => {
          const data = response.data.data
          if (!data) {
            reject('请再次登录')
          }
          const { avator, introduction, name, roles } = data
          commit('SET_AVATOR', avator)
          commit('SET_INTRODUCTION', introduction)
          commit('SET_NAME', name)
          commit('SET_ROLES', roles)
          resolve(data)
        })
        .catch(e => {
          reject(e)
        })
    })
  },
  resetToken({ commit }) {
    return new Promise(resolve => {
      commit('SET_TOKEN', '')
      commit('SET_ROLES', [])
      removeToken()
      resolve()
    })
  }
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, name) => {
    state.username = name
  },
  SET_AVATOR: (state, url) => {
    state.avator = url
  },
  SET_INTRODUCTION: (state, params) => {
    state.introduction = params
  },
  SET_NAME: (state, params) => {
    state.name = params
  },
  SET_ROLES: (state, params) => {
    state.roles = params
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
