import {
  Axios
} from 'axios';
import {
  Message
} from 'element-ui'
import Cookies from 'js-cookie'
import router from '@/router'

// 创建axios 实例
const service = Axios.create({
  baseURL: process.env.BASE_URL, //api的baseurl
  timeout: 222222 //请求超时时间
})


/** 
 * 请求前拦截
 * 用户处理需要在请求前的操作
 */

service.interceptors.request.use(
  config => {
    const token = Cookies.get('token')
    if (token) {
      config.headers['X-token'] = token
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)

/**
 *  请求响应拦截
 *  用户处理需要在请求返回后的操作
 */

service.interceptors.response.use(
  response => {
    const responseCode = response.status
    if (responseCode === 200) {
      return Promise.resolve(response)
    } else {
      return Promise.reject(response)
    }
  },
  error => {
    /**
     * 断网
     * 请求超时状态
     */
    if (!error.response) {
      if (error.message.includes('timeout')) {
        Message.error('请求超时, 请检测网络是否连接正常')
      } else {
        Message.error('请求错误, 请检测网络是否连接正常')
      }
      return
    }

    const responseCode = error.response.status

    /**
     * 401 : 未登录
     * 403 ： token 过期 ， 清除 token , 重新登录
     * 404 : 请求不存在
     */

    switch (responseCode) {

      case 401:
        // <!-- 弹出错误信息 -->
        Message({
          type: 'error',
          message: '请重新登录'
        })
        // 然后跳转至登录
        router.replace({
          path: '/login',
          query: {
            redirect: router.currentRoute.fullPath
          }
        })
        break;

      case 403:
        // <!-- 弹出错误信息 -->
        Message({
          type: 'error',
          message: '登录已过期, 请重新登录'
        })
        // <!-- 删除过期token -->
        Cookies.remove('token');
        // 然后跳转至登录
        router.replace({
          path: '/login',
          query: router.currentRoute.fullPath

        })
        break;

      case 404:
        // <!-- 弹出错误信息 -->
        Message({
          type: 'error',
          message: '网络请求不存在'
        })
        break;
      default:
        // <!-- 弹出错误信息 -->
        Message({
          type: 'error',
          message: error.response.data.message
        })
        break;
    }
  }
)
export default service