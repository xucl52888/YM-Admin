import { createWebHashHistory, createRouter, RouteRecordRaw } from 'vue-router'
import setupGuards from './guards'

//普通路由无需验证权限
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'layout',
    redirect: '/home',
    component: () => import('@/layout/index.vue'),
    children: [],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/login/index.vue'),
  },
  // {
  //   path: '/:path(.*)*',
  //   name: '404',
  //   component: () => import('@/layout/index.vue'),
  //   children: [
  //     {
  //       path: '/:path(.*)*',
  //       name: '404',
  //       component: import('@/views/exception/404.vue'),
  //       meta: {
  //         title: '404',
  //         affix: false,
  //         breadcrumb: [
  //           {
  //             path: '/404',
  //             name: '404',
  //           },
  //         ],
  //       },
  //     },
  //   ],
  // },
]
const router = createRouter({
  // history: createWebHistory(),  // 路由History模式
  history: createWebHashHistory(), // 路由哈希模式 带#
  routes, // 路由合集
})

// 路由守卫
setupGuards(router)

export default router
