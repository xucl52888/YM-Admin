// 路由守卫
import { Router } from 'vue-router'
import { useUserStore } from '@/store/user'
export default function setupGuards(router: Router) {
  router.beforeEach((to, from) => {
    // console.log('111---beforeEach', to, from)
    // if (to.name === 'home') {
    //   return { name: 'login' }
    // }
    const userStore = useUserStore()
    if (!userStore.token && to.name !== 'login') {
      return { name: 'login' }
    }
  })
  router.beforeResolve((to, from) => {
    // console.log('222---beforeResolve', to, from)
  })
  router.afterEach((to, from) => {
    // console.log('333---afterEach', to, from)
  })
}
