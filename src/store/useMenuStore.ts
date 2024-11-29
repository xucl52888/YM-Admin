import { defineStore } from 'pinia'

export const useMenuStore = defineStore('menuId', {
  state: () => ({
    menu: [],
  }),
  getters: {
    getMenu() {
      return this.menu
    },
  },
  actions: {
    setMenu(data) {
      this.menu = data
    },
  },
  persist: {
    pick: ['menu'],
  },
})
