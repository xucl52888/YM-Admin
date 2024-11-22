import { ElLoading } from 'element-plus'

let loadingInstance = null
let timer = null // 用于控制延迟

export const startLoading = () => {
  if (!loadingInstance) {
    timer = setTimeout(() => {
      loadingInstance = ElLoading.service({
        lock: true,
        text: '加载中...',
        background: 'rgba(255, 255, 255, 0)',
        customClass: 'custom-loading-bar', // 自定义样式
      })
    }, 100) // 延迟100ms后显示加载条
  }
}

export const stopLoading = () => {
  clearTimeout(timer) // 如果还在延迟中，清除定时器
  timer = null

  if (loadingInstance) {
    loadingInstance.close()
    loadingInstance = null
  }
}
