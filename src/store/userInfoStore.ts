import { defineStore } from 'pinia'

export const userInfoStore = defineStore('userId', {
  state: () => ({
    token: '',
    rolePerm: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
    setUserInfo() {},
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
