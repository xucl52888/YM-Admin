// mockProdServer.ts 文件
import { createProdMockServer } from 'vite-plugin-mock/es/createProdMockServer'

const modules: Record<string, any> = import.meta.glob('../mock/**/*.ts', {
  eager: true,
})
const mockModules = []

Object.keys(modules).forEach((key) => {
  if (key.includes('/_')) return
  mockModules.push(...modules[key].default)
})
/**
 * 用于生产环境。需要手动导入所有模块
 */
export function setupProdMockServer() {
  createProdMockServer(mockModules)
}
