import './styles/tailwind.css'
import './styles/style.scss'
import { createApp } from 'vue' // vue
import App from './App.vue' // 根组件
import router, { setupRouter } from './router' // 路由
import { setupStore } from '@/store'

// element-plus相关
import 'element-plus/dist/index.css' // element css
import * as ElementPlusIconsVue from '@element-plus/icons-vue' // element图标
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn' // element 中文
import 'element-plus/theme-chalk/dark/css-vars.css' // 暗黑模式

// 按需引入echarts
import { setupEcharts } from './plugins/echarts'

// 按需引入vxe-table
import { setupVxetable } from './plugins/vxetable'

// 注册全局自定义指令
import { setupDirectives } from './plugins/directives'

// 挂载全局方法
async function bootstrap() {
  // 创建vue实例
  const app = createApp(App)

  // 挂载状态管理
  setupStore(app)

  // 注册element图标
  for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
  }

  // echarts
  setupEcharts(app)

  // vxe-table
  setupVxetable(app)

  // 注册全局自定义指令，如：v-permission权限指令
  setupDirectives(app)

  // 挂载路由
  setupRouter(app)
  // 路由准备就绪后挂载 APP 实例
  await router.isReady() // 等待路由准备就绪

  // element 国际化
  app.use(ElementPlus, { locale: zhCn })

  // 挂载应用
  app.mount('#app', true)
}

void bootstrap()
