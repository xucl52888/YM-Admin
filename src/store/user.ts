import { defineStore } from 'pinia'
export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
  }),
  actions: {
    setToken(token: string) {
      this.token = token
    },
  },
  getters: {
    getToken(): string {
      return this.token
    },
  },
})
