import { defineStore } from 'pinia'

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: () => ({
    collapsed: false, // 菜单是否折叠，默认 false 不折叠
  }),
  getters: {
    getCollapsed(): boolean {
      return this.collapsed
    },
  },
  actions: {
    setCollapsed() {
      this.collapsed = !this.collapsed
    },
  },
  persist: {
    pick: ['collapsed'],
  },
})
