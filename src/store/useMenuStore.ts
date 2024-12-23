import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuId', {
  state: () => ({
    menu: [],
    isDynamicRouteAdded: false,
  }),
  getters: {
    getMenu() {
      return this.menu
    },
    getIsDynamicRouteAdded(): boolean {
      return this.isDynamicRouteAdded
    },
  },
  actions: {
    setMenu(data) {
      this.menu = data
    },
    setDynamicRouteAdded(added: boolean) {
      this.isDynamicRouteAdded = added
    },
  },
  persist: {
    pick: ['menu'],
  },
})
