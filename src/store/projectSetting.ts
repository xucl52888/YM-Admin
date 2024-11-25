import { defineStore } from 'pinia'

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: () => ({
    collapsed: false, // 菜单是否折叠，默认 false 不折叠
    fullScreen: false, // 是否全屏，默认 false 不全屏
    elementTheme: 'light', // 主题，默认 light，可选 dark
  }),
  getters: {
    getCollapsed(): boolean {
      return this.collapsed
    },
    getFullScreen(): boolean {
      return this.fullScreen
    },
    getElementTheme(): string {
      return this.elementTheme
    },
  },
  actions: {
    setCollapsed() {
      this.collapsed = !this.collapsed
    },
    setFullScreen() {
      this.fullScreen = !this.fullScreen
    },
    setElementTheme(val: string) {
      this.elementTheme = val
    },
  },
  persist: {
    pick: ['collapsed', 'elementTheme'],
  },
})
