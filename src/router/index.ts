import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import setupGuards from './guards'

// 路由配置
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/home/index.vue'),
      },
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
]

const router = createRouter({
  // history: createWebHistory(),  // 路由History模式
  history: createWebHashHistory(), // 路由哈希模式 带#
  routes,
})
setupGuards(router)
export default router
