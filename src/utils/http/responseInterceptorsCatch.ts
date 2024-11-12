import axios from 'axios'
import { checkStatus } from './checkStatus'
import { ElMessage, ElMessageBox } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
/**
 * @description: 响应错误处理
 */
const responseInterceptorsCatch = (error: any) => {
  const { response, code, message } = error || {}
  // TODO 此处要根据后端接口返回格式修改
  const msg: string = response && response.data && response.data.message ? response.data.message : ''
  const err: string = error.toString()
  try {
    if (code === 'ECONNABORTED' && message.indexOf('timeout') !== -1) {
      ElMessage.error('接口请求超时，请刷新页面重试!')
      return
    }
    if (err && err.includes('Network Error')) {
      ElMessageBox.confirm('请检查您的网络连接是否正常', '网络异常', {
        confirmButtonText: '确认',
        // cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
        closeOnPressEscape: false,
      })
        .then(() => {})
        .catch(() => {})
      return Promise.reject(error)
    }
  } catch (error) {
    throw new Error(error as any)
  }
  // 请求是否被取消
  const isCancel = axios.isCancel(error)
  if (!isCancel) {
    checkStatus(error.response && error.response.status, msg)
  } else {
    console.warn(error, '请求被取消！')
  }
  return Promise.reject(error)
}
export default responseInterceptorsCatch
