// 路由守卫
import { Router } from 'vue-router'
import { userInfoStore } from '@/store/userInfoStore'
import { useMenuStore } from '@/store/useMenuStore'
import { initRouter } from '@/hooks/useInitTouter'
// import { startLoading, stopLoading } from '@/utils/loadingBar'

export default function setupGuards(router: Router) {
  router.beforeEach(async (to, from) => {
    if (!userInfoStore().token && to.name !== 'login') {
      // 如果没有token且不是登录页，则跳转到登录页
      return { name: 'login' }
    }

    if (useMenuStore().getIsDynamicRouteAdded) {
      return
    }
    // 动态添加路由  注释：已经将动态添加路由放到main.ts和登录之后，这里不再需要，但保留代码，目前在main.ts中执行一次（防止刷新），在登录之后执行一次
    await initRouter()

    // 当前路由没有匹配到任何路由记录
    if (to.matched.length == 0) router.push(to.fullPath) // 如果未匹配到路由记录，则跳转到当前路由
    // startLoading()
  })

  router.beforeResolve((to, from) => {})

  router.afterEach((to, from) => {
    // stopLoading()
  })
}
