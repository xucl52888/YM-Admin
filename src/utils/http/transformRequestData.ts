import { AxiosResponse } from 'axios'
import router from '@/router'
import { storage } from '@/utils/Storage'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { Action } from 'element-plus'
import 'element-plus/theme-chalk/el-message.css'
import 'element-plus/theme-chalk/el-message-box.css'
/**
 * @description: 请求结果集
 */
enum ResultEnum {
  SUCCESS = 200,
  ERROR = -1,
  TIMEOUT = 10042,
  TYPE = 'success',
}

export interface RequestOptions {
  // 是否显示提示信息
  isShowMessage?: boolean
  // 成功的文本信息
  successMessageText?: string
  // 是否显示成功信息
  isShowSuccessMessage?: boolean
  // 是否显示失败信息
  isShowErrorMessage?: boolean
  // 错误的文本信息
  errorMessageText?: string
  // 错误消息提示类型
  errorMessageMode?: 'none' | 'modal'
  // 不进行任何处理，直接返回
  isTransformResponse?: boolean
  // 是否返回原生响应头
  isReturnNativeResponse?: boolean
}

/**
 * @description: 处理请求数据
 */
const transformRequestData = (res: AxiosResponse, options: RequestOptions = {}) => {
  const {
    isShowMessage = true, // 是否显示提示信息
    successMessageText, // 成功提示信息
    isShowSuccessMessage, // 是否显示成功信息
    isShowErrorMessage, // 是否显示错误信息
    errorMessageText, // 错误提示信息
    isTransformResponse = true, // 是否转换返回数据
    isReturnNativeResponse, // 是否返回原生响应头
  } = options

  // 是否返回原生响应头 比如：需要获取响应头时使用该属性
  if (isReturnNativeResponse) return res

  // 用于页面代码可能需要直接获取code，data，message这些信息时开启
  if (!isTransformResponse) return res.data

  // 结构出data
  const { data } = res
  if (!data) throw new Error('请求出错，请稍候重试') // return '[HTTP] Request has no return value'; 如果没有返回数据，则抛出错误

  //  这里 code，result，message为 后台统一的字段，需要修改为项目自己的接口返回格式
  const { code, result, message } = data

  // 请求成功
  const hasSuccess = data && Reflect.has(data, 'code') && code === ResultEnum.SUCCESS // 200

  // 是否显示提示信息
  if (isShowMessage) {
    if (hasSuccess && (successMessageText || isShowSuccessMessage)) {
      // 是否显示自定义信息提示
      ElMessage({
        message: successMessageText || message || '操作成功！',
        type: 'success',
      })
    } else if (!hasSuccess && (errorMessageText || isShowErrorMessage)) {
      // 是否显示自定义信息提示
      ElMessage.error(message || errorMessageText || '操作失败！')
    } else if (!hasSuccess && options.errorMessageMode === 'modal') {
      // errorMessageMode=‘custom-modal’的时候会显示modal错误弹窗，而不是消息提示，用于一些比较重要的错误
      ElMessageBox.alert(message, '提示', {
        confirmButtonText: '确认',
        callback: (action: Action) => {
          // ElMessage({
          //   type: 'info',
          //   message: `action: ${action}`,
          // })
        },
      })
    }
  }

  // 接口请求成功，直接返回结果 200
  if (code === ResultEnum.SUCCESS) return result

  // 接口请求错误，统一提示错误信息 这里逻辑可以根据项目进行修改
  let errorMsg = message
  switch (code) {
    // 请求失败
    case ResultEnum.ERROR: // -1
      ElMessage.error(errorMsg)
      break
    // 登录超时
    case ResultEnum.TIMEOUT: // 10042
      const LoginName = 'login'
      const LoginPath = '/login'
      if (router.currentRoute.value?.name === LoginName) return
      // 到登录页
      errorMsg = '登录超时，请重新登录!'
      ElMessageBox.confirm('登录身份已失效，请重新登录!', '提示', {
        confirmButtonText: '确认',
        cancelButtonText: '取消',
        type: 'warning',
        closeOnClickModal: false,
        closeOnPressEscape: false,
      })
        .then(() => {
          storage.clear() // 清除所有缓存
          window.location.href = LoginPath // 跳转到登录页面
        })
        .catch(() => {})
      break
  }
  throw new Error(errorMsg)
}

export default transformRequestData
