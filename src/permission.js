import router from './router'
import { getToken } from '@/untils/auth'
import store from './store'
import { Message } from 'element-ui'
// 路由前置配置

const whiteList = ['/login', '/auth-redirect']
router.beforeEach(async(to, from, next) => {
  const hasToken = getToken()
  if (hasToken) {
    if (to.path === '/login') {
      // console.log('执行1')
      //   进入首页
      next({ path: '/' })
    } else {
      // console.log('执行2')
      // 确定用户是否通过getInfo获取到了用户权限
      const hasRoles = store.getters.roles && store.getters.roles.length > 0
      if (hasRoles) {
        //   判断是否有role
        // console.log('执行3')
        next()
      } else {
        // console.log('执行4')
        try {
          //   没有则进行发布事件,得到roles
          const { roles } = await store.dispatch('user/getInfo')
          //   得到roles 进行 获取用户路由权限, 得到了需要显示的路由
          const accessRoutes = await store.dispatch(
            'permission/generateRoutes',
            roles
          )
          // 然后动态添加可以访问的路由
          router.addRoutes(accessRoutes)
          // hack 方法确保addroutes 完成
          // 设置replace:true  导航不会留下历史记录
          next({ ...to, replace: true })
        } catch (error) {
          // 删除token ，转到登录页面重新登录
          await store.dispatch('user/resetToken')
          Message.error(error || 'Has Error')
          next(`/login?redirect=${to.path}`)
        }
      }
    }
  } else {
    // console.log('执行5')
    // NO token
    if (whiteList.indexOf(to.path) !== -1) {
      // console.log('执行6')
      next()
    } else {
      // console.log('执行7')

      next(`/login?redirect=${to.path}`)
    }
  }
})
