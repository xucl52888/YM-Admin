import './styles/tailwind.css'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'

async function bootstrap() {
  const app = createApp(App)
  // pinia
  const pinia = createPinia()
  app.use(pinia)

  // router
  app.use(router)

  app.mount('#app')
}

void bootstrap()
