import axios, { AxiosResponse, AxiosRequestConfig } from 'axios'
import { AxiosCanceler } from './axiosCancel'
import transformRequestData from './transformRequestData'
import responseInterceptorsCatch from './responseInterceptorsCatch'
import { isFunction } from '@/utils/is'

// 创建axios实例
const axiosInstance = axios.create({
  baseURL: '/api',
})
const axiosCanceler = new AxiosCanceler()

// 请求拦截器
axiosInstance.interceptors.request.use(
  function (config: AxiosRequestConfig): any {
    const token: string | null = localStorage.getItem('TOKEN')
    if (token) config.headers['Authorization'] = token

    // 添加请求
    axiosCanceler.addPending(config)

    return config
  },
  function (error) {},
)

// 响应拦截器
axiosInstance.interceptors.response.use(
  //响应成功
  function (response): any {
    axiosCanceler.removePending(response.config)

    return response
  },
  // 响应错误
  function (error) {
    // 这里要提示错误信息
    responseInterceptorsCatch(error)
  },
)

/**
 * @request  封装axios请求
 * @params url 请求地址
 * @params params 请求参数
 * @params config 请求配置
 * @returns Promise
 */
const http = {
  request<T>(conf: AxiosRequestConfig, config?: object): Promise<T> {
    return new Promise((resolve, reject) => {
      axiosInstance
        .request<T>(conf)
        .then((res: AxiosResponse) => {
          // 请求是否被取消
          // const isCancel = axios.isCancel(res)
          // if (transformRequestData && isFunction(transformRequestData) && !isCancel) {
          //   try {
          //     const ret = transformRequestData(res, config)
          //     resolve(ret)
          //   } catch (error) {
          //     reject(error)
          //   }
          //   return
          // }
          // resolve(res as unknown as Promise<T>)
          if (res) {
            const ret = transformRequestData(res, config)
            resolve(ret)
          } else {
            reject(res)
          }
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
}

export default http
