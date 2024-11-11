import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'

// mock-plugin
import { viteMockServe } from 'vite-plugin-mock'

// 获取绝对路径
const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir)
}

// https://vite.dev/config/
export default defineConfig(({ command, mode, isSsrBuild, isPreview }: ConfigEnv) => {
  if (command === 'serve') {
    console.log('is serve')
  } else {
    console.log('is build')
  }
  return {
    plugins: [
      vue(),
      AutoImport({
        resolvers: [ElementPlusResolver()],
      }),
      Components({
        resolvers: [ElementPlusResolver()],
      }),
      // 配置mock
      viteMockServe({
        mockPath: './mock/',
        // supportTs: true, // 如果您的 Mock 数据文件是 TypeScript 文件，请设置为 true
      }),
    ],
    css: {},
    // 别名
    resolve: {
      alias: [
        {
          find: '@',
          replacement: pathResolve('src') + '/',
        },
      ],
    },
    // 开发
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:3000/',
          changeOrigin: true,
        },
      },
    },
    // 打包
    build: {},
  }
})
