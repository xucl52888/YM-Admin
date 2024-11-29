// 路由守卫
import { Router, RouteRecordRaw } from 'vue-router'
import { userInfoStore } from '@/store/userInfoStore'
import { initRouter } from '@/hooks/useInitTouter'
// import { startLoading, stopLoading } from '@/utils/loadingBar'

// 404页面
const ErrorPageRoute: RouteRecordRaw = {
  path: '/:path(.*)*',
  name: '404',
  redirect: '/exception/404',
  component: () => import('@/layout/index.vue'),
  children: [
    {
      path: '/:path(.*)*',
      name: '404',
      component: import('@/views/exception/404.vue'),
      meta: {
        title: '404',
        affix: false,
        children: null,
        breadcrumb: [
          {
            path: '/404',
            name: '404',
            meta: {
              title: '404',
              icon: 'el-icon-house',
              affix: false,
            },
          },
        ],
      },
    },
  ],
}

export default function setupGuards(router: Router) {
  router.beforeEach(async (to, from) => {
    if (!userInfoStore().token && to.name !== 'login') return { name: 'login' } // 如果没有token且不是登录页，则跳转到登录页

    //动态添加路由
    await initRouter()

    //添加404
    const isErrorPage = router.getRoutes().findIndex((item) => item.name === ErrorPageRoute.name) // 避免重复添加
    if (isErrorPage === -1) {
      router.addRoute(ErrorPageRoute as unknown as RouteRecordRaw)
    }

    //当前路由没有匹配到任何路由记录
    if (to.matched.length == 0) router.push(to.fullPath) // 如果未匹配到路由记录，则跳转到当前路由
    // startLoading()
  })

  router.beforeResolve((to, from) => {})

  router.afterEach((to, from) => {
    // stopLoading()
  })
}
