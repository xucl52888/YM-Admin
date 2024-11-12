import { defineStore } from 'pinia'
import { getInfo } from '@/api/user'

export const userStore = defineStore('userId', {
  state: () => ({
    token: '',
    rolePerm: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    async getUserInfo() {
      const res = await getInfo()
    },
  },
  getters: {
    getToken(): string {
      return this.token
    },
  },
  persist: {
    // storage: localStorage, // 默认走localStorage  sessionStorage
    pick: ['token'], // 指定要缓存的数据
  },
})
