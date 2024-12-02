import { defineStore } from 'pinia'

export const useProjectSettingStore = defineStore({
  id: 'app-project-setting',
  state: () => ({
    collapsed: false, // 菜单是否折叠，默认 false 不折叠
    fullScreen: false, // 是否全屏，默认 false 不全屏
    elementTheme: 'light', // 主题，默认 light，可选 dark
    themeColor: '#409eff', // 主题颜色，默认 #409eff
    navigationBarMode: 'leftMenu', // 导航栏模式 topMenu
    showLogo: true, // 显示logo
    showTags: true, // 显示标签页
    showBreadcrumb: true, // 显示面包屑
    showBreadcrumbIcon: true, // 显示面包屑图标
    isPageAnimate: true, // 是否开启页面动画
    pageAnimateType: 'zoom-fade', // 动画类型
  }),
  getters: {
    // 菜单折叠
    getCollapsed(): boolean {
      return this.collapsed
    },
    // 是否全屏
    getFullScreen(): boolean {
      return this.fullScreen
    },
    // 深色模式切换
    getElementTheme(): string {
      return this.elementTheme
    },
    // 主题颜色
    getThemeColor(): string {
      return this.themeColor
    },
    // 导航栏模式
    getNavigationBarMode(): string {
      return this.navigationBarMode
    },
  },
  actions: {
    // 菜单折叠
    setCollapsed() {
      this.collapsed = !this.collapsed
    },
    // 是否全屏
    setFullScreen() {
      this.fullScreen = !this.fullScreen
    },
    // 深色模式切换
    setElementTheme(val: string) {
      this.elementTheme = val
    },
    // 主题颜色
    setThemeColor(val: string) {
      this.themeColor = val
    },
    // 导航栏模式
    setNavigationBarMode(val: string) {
      if (val === this.navigationBarMode) return
      this.collapsed = false
      this.navigationBarMode = val
    },
  },
  persist: true, // 全部持久化
  // persist: {
  //   pick: ['collapsed', 'fullScreen', 'elementTheme', 'themeColor', 'navigationBarMode'],
  // },
})
