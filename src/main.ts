import './styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'
// element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

async function bootstrap() {
  const app = createApp(App)
  // pinia
  const pinia = createPinia()
  // 使用持久化插件
  pinia.use(piniaPluginPersistedstate)
  app.use(pinia)

  // 注册element图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // router
  app.use(router)

  app.mount('#app')
}

void bootstrap()
