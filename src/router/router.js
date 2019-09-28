import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);



/**
 * asyncRoutes
 * 需要根据用户角色动态加载路由
 */

export const asyncRoutes = [{
  path: '*',
  redirect: '/404',
  hidden: true
}]



/**
 * constantRoutes
 * 没有权限要求的基页
 * 可以访问所有角色
 */

export const constantRoutes = [{
    path: '/',
    redirect: "/home",
    component: Layout,
    children: [{
      path: 'home',
      component: () => import("@/views/Home/index"),
      name: 'Home',
      meta: {
        title: 'dashboard',
        icon: 'dashboard',
        affix: true
      }
    }]
  },
  {
    path: '/login',
    name: 'login',
    component: () => import("@/views/Login/index")
  }
]

const createRouter = () => {
  new Router({
    routes: constantRoutes
  })
}

const router = createRouter()
export function resetRouter() {
  const newRouter = createRouter();
  router.matcher = newRouter.matcher; //reset router
}

export default router