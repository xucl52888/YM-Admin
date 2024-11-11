import './styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

async function bootstrap() {
  const app = createApp(App)
  // pinia
  const pinia = createPinia()
  // 使用持久化插件
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  // router
  app.use(router)

  app.mount('#app')
}

void bootstrap()
