import './styles/tailwind.css'
import './styles/style.scss'
import './styles/dark/css-vars.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

// element图标
import * as ElementPlusIconsVue from '@element-plus/icons-vue'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // element 中文
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式

// 按需引入echarts
import { setupEcharts } from './plugins/echarts'

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
  // echarts
  setupEcharts(app)

  // router
  app.use(router)
  // element 国际化
  app.use(ElementPlus, {
    locale: zhCn,
  })

  app.mount('#app')
}

void bootstrap()
