import type { App } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate' // 持久化

const store = createPinia()
store.use(piniaPluginPersistedstate) // 使用持久化插件

export function setupStore(app: App<Element>) {
  app.use(store)
}

export { store }
