import { login } from '@/api/api'
import { Message } from 'element-ui'
import { getToken, setToken } from '@/untils/auth'
const state = {
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
  }
}
const mutations = {
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_USERNAME: (state, name) => {
    state.username = name
  }
}

export default {
  namespaced: true,
  state,
  actions,
  mutations
}
