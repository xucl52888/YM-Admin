import { defineConfig, ConfigEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers'
import { resolve } from 'path'
import { format } from 'date-fns'

import pkg from './package.json' // 获取package.json中的name
const { dependencies, devDependencies, name, version } = pkg
const __APP_INFO__ = {
  pkg: { dependencies, devDependencies, name, version },
  lastBuildTime: format(new Date(), 'yyyy-MM-dd HH:mm:ss'),
}

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
  const prodMock = true
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
        mockPath: 'mock', // mock文件夹路径
        localEnabled: command === 'serve', // 本地模式
        prodEnabled: command !== 'serve' && prodMock, // 生产模式
        // 如果需要在生成模式下使用需要注入代码，在src文件下创建 mockProdServer.ts 文件
        injectCode: `
          import { setupProdMockServer } from './mockProdServer';
          setupProdMockServer();
        `,
        logger: false, // 是否打印日志
      }),
    ],
    // 全局变量
    define: {
      __APP_INFO__: JSON.stringify(__APP_INFO__),
    },
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
    build: {
      base: './', // 打包时会给资源路劲变成./**/**...
      // target: 'es2015',
      // cssTarget: 'chrome80',
      // outDir: 'dist', // 指定输出路径（相对于项目根目录) 默认：dist

      // 小于此阈值的导入或引用资源将内联为 base64 编码，以避免额外的 http 请求。设置为 0 可以完全禁用此项。
      assetsInlineLimit: 4096, // 默认： 4096 (4 KiB)

      // 构建后是否生成 source map 文件。如果为 true，将会创建一个独立的 source map 文件。
      // 如果为 'inline'，source map 将作为一个 data URI 附加在输出文件中。'hidden' 的工作原理与 true 相似，
      // 只是 bundle 文件中相应的注释将不被保留。
      sourcemap: false, // 默认：false

      // 启用/禁用 gzip 压缩大小报告。压缩大型输出文件可能会很慢，因此禁用该功能可能会提高大型项目的构建性能。
      reportCompressedSize: true,

      chunkSizeWarningLimit: 2000, // 规定触发警告的 chunk 大小

      assetsDir: 'static/img/', // 默认：assets 指定生成静态资源的存放路径（相对于 build.outDir）。在 库模式 下不能使用。

      rollupOptions: {
        // 配置rollup 拆分打包的方法
        output: {
          // 配置rollup输出选项
          // Static resource classification and packaging// 静态资源分类打包
          chunkFileNames: `static/js/[name]-[hash].js`, // 代码块文件名，统一放到static/js/目录下
          entryFileNames: `static/js/[name]-[hash].js`, //入口文件名 统一放到static/js/目录下
          assetFileNames: `static/[ext]/[name]-[hash].[ext]`, // 资源文件名 统一放到static/js(jpg/png/ttf/css等)/目录下
          // 此配置内进行分包，进行分离带三方依赖
          manualChunks(id) {
            // 参数 ID，就是所有文件的绝对路劲
            // 将 node_modules 中的代码单独打包成一个js文件
            if (id.includes('node_modules')) {
              // 因为 node_modules 中的依赖需要单独打包出去
              // 这里的 return 的值就是打包的文件名称
              return id.toString().split('node_modules/')[1].split('/')[0].toString()
            }
          },
        },
      },
    },
  }
})
