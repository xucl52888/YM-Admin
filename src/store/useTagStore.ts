import { defineStore } from 'pinia'
import { ITagRoute } from '@/interface/tag'

//保留固定路由
function retainAffixRoute(list: ITagRoute[]) {
  return list.filter((item) => item?.affix ?? false)
}
export const useTagStore = defineStore('tagId', {
  state: (): {
    viewTags: ITagRoute[]
    keepAlive: string[]
  } => {
    return {
      viewTags: [],
      keepAlive: [],
    }
  },
  getters: {},
  actions: {
    // 初始化标签页
    initTabs(routes: ITagRoute[]) {
      this.viewTags = routes
      this.keepAlive = this.viewTags.map((item) => item.name)
    },
    //添加标签
    pushViewTags(route: ITagRoute) {
      let target = this.viewTags.find((item) => item.path === route.path) as ITagRoute
      if (!target) {
        this.viewTags.push(route)
        this.keepAlive.push(route.name)
      }
    },
    //删除标签
    removeViewTags(route: ITagRoute) {
      this.viewTags.forEach((item: ITagRoute, index: number) => {
        if (item.path === route.path) {
          this.viewTags.splice(index, 1)
          this.keepAlive.splice(index, 1)
        }
      })
    },
    closeOtherTabs(route: ITagRoute) {
      // 关闭其他
      this.viewTags = this.viewTags.filter((item) => item.path == route.path || (item?.affix ?? false))
      this.keepAlive = this.viewTags.map((item) => item.name)
    },
    closeAllTabs() {
      // 关闭全部
      this.viewTags = retainAffixRoute(this.viewTags)
      this.keepAlive = this.viewTags.map((item) => item.name)
    },
  },
  persist: {
    // storage: localStorage, // 默认走localStorage  sessionStorage
    pick: ['viewTags', 'keepAlive'], // 指定要缓存的数据
  },
})
