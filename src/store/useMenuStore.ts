import { defineStore } from 'pinia'
import { getUserMenu } from '@/api/user'
import { userStore } from '@/store/userStore'
import { Parent } from '@/interface/user'

export const useMenuStore = defineStore('menuId', {
  state: (): {
    menu: Parent[]
  } => {
    return {
      menu: [],
    }
  },
  getters: {},
  actions: {
    async getMenu() {
      const res = await getUserMenu({ userId: userStore().rolePerm })
      this.menu = res
    },
  },
  persist: {
    pick: ['menu'],
  },
})
